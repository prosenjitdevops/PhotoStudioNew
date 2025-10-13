const mongoose = require('mongoose');
const Artwork = require('./models/Artwork');

mongoose.connect('mongodb://localhost:27017/artgallery')
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

const artworks = [
  {
    title: "Woman in Black",
    medium: "Digital",
    theme: "Fantasy",
    price: 3000,
    url: "/images/2.png"
  },
  {
    title: "Skateboarding",
    medium: "Watercolor",
    theme: "Abstract",
    price: 800,
    url: "/images/3.png"
  },
  {
    title: "The Black Pearl",
    medium: "Watercolor",
    theme: "Fantasy",
    price: 8000,
    url: "/images/4.png"
  },
  {
    title: "Abstract Painting",
    medium: "Watercolor",
    theme: "Abstract",
    price: 2500,
    url: "/images/5.png"
  },
  {
    title: "Oil Painting",
    medium: "Watercolor",
    theme: "Abstract",
    price: 1200,
    url: "/images/6.png"
  },
  {
    title: "Village",
    medium: "Watercolor",
    theme: "Nature",
    price: 7000,
    url: "/images/8.jpg"
  },
  {
    title: "Gyrate Sclupture",
    medium: "Digital",
    theme: "Abstract",
    price: 3500,
    url: "/images/9.jpg"
  },
  {
    title: "Face",
    medium: "Watercolor",
    theme: "Fantasy",
    price: 500,
    url: "/images/10.jpg"
  },
  {
    title: "Girl with Flowers",
    medium: "Watercolor",
    theme: "Nature",
    price: 2000,
    url: "/images/11.jpg"
  },
  {
    title: "Flying Birds",
    medium: "Watercolor",
    theme: "Nature",
    price: 3000,
    url: "/images/12.jpg"
  },
  {
    title: "Abstract Art",
    medium: "Watercolor",
    theme: "Abstract",
    price: 3000,
    url: "/images/13.jpg"
  },
  {
    title: "Dancing Skeleton",
    medium: "Digital",
    theme: "Fantasy",
    price: 6000,
    url: "/images/14.png"
  },
  {
    title: "Tea Time",
    medium: "Watercolor",
    theme: "Nature",
    price: 2600,
    url: "/images/15.jpg"
  },
  {
    title: "Arabic Era",
    medium: "Watercolor",
    theme: "Fantasy",
    price: 8500,
    url: "/images/16.jpg"
  },
  {
    title: "Abstract Tiger",
    medium: "Digital",
    theme: "Abstract",
    price: 3500,
    url: "/images/17.jpg"
  },
  {
    title: "Cosmos",
    medium: "Digital",
    theme: "Nature",
    price: 650,
    url: "/images/18.jpg"
  }
];

async function seed() {
  await Artwork.deleteMany({});
  await Artwork.insertMany(artworks);
  console.log('Artworks seeded!');
  mongoose.disconnect();
}

seed();