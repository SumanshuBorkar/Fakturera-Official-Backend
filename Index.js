const express = require('express');
const cors = require('cors');
const sequelize = require('./db');
const Product = require('./Modles/Products');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());

app.get('/api/products', async (req, res) => {
  const products = await Product.findAll({ order: [['id', 'ASC']] });
  res.json(products);
});

app.put('/api/products/:id', async (req, res) => {
  const { id } = req.params;
  await Product.update(req.body, { where: { id } });
  const updated = await Product.findByPk(id);
  res.json(updated);
});

app.post('/api/init', async (req, res) => {
  const count = await Product.count();
  if (count === 0) {
    const demoProducts = Array.from({ length: 20 }).map((_, i) => ({
      articleNo: `ART${1000 + i}`,
      productService: `Test product ${i + 1} with fifty characters`,
      inPrice: 1000 + i * 13,
      price: 1500 + i * 8,
      unit: "kilometers/hour",
      inStock: 2000 + i * 5,
      description: `Description for product ${i + 1} with some text`
    }));
    await Product.bulkCreate(demoProducts);
    res.json({status: "20 demo products created"});
  } else {
    res.json({status: "Already initiated"});
  }
});

app.post('/api/products', async (req, res) => {
    try {
      // Provide default values or use req.body if sent from frontend
      const defaultProduct = {
        articleNo: "NEW_ARTICLE",
        productService: "New Product",
        inPrice: 0,
        price: 0,
        unit: "unit",
        inStock: 0,
        description: "New product description"
      };
  
      // Create new product in DB
      const newProduct = await Product.create(req.body && Object.keys(req.body).length ? req.body : defaultProduct);
  
      res.status(201).json(newProduct);
    } catch (err) {
      console.error("Error creating new product:", err);
      res.status(500).json({ error: "Failed to create product" });
    }
  });

const port = process.env.PORT || 4000;
sequelize.sync().then(() => {
  app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
  });
});
