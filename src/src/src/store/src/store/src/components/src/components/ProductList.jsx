import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { addItem, selectCartCount, selectCartItems } from '../store/CartSlice';

const categories = [
  {
    name: '🌴 Tropical Plants',
    plants: [
      { id: 1,  name: 'Monstera Deliciosa', price: 24.99, image: 'https://images.unsplash.com/photo-1614594975525-e45190c55d0b?w=400&q=80' },
      { id: 2,  name: 'Bird of Paradise',   price: 39.99, image: 'https://images.unsplash.com/photo-1632207691143-643e2a9a9361?w=400&q=80' },
      { id: 3,  name: 'Fiddle Leaf Fig',    price: 34.99, image: 'https://images.unsplash.com/photo-1593691509543-c55fb32d8de5?w=400&q=80' },
      { id: 4,  name: 'Banana Plant',       price: 29.99, image: 'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=400&q=80' },
      { id: 5,  name: 'Philodendron',       price: 18.99, image: 'https://images.unsplash.com/photo-1545241047-6083a3684587?w=400&q=80' },
      { id: 6,  name: 'Areca Palm',         price: 27.99, image: 'https://images.unsplash.com/photo-1604762524889-3e2fcc145683?w=400&q=80' },
    ],
  },
  {
    name: '💨 Air-Purifying Plants',
    plants: [
      { id: 7,  name: 'Snake Plant',   price: 14.99, image: 'https://images.unsplash.com/photo-1585487000160-6ebcfceb0d03?w=400&q=80' },
      { id: 8,  name: 'Peace Lily',    price: 16.99, image: 'https://images.unsplash.com/photo-1606574977734-8a2f1db84f2b?w=400&q=80' },
      { id: 9,  name: 'Spider Plant',  price: 11.99, image: 'https://images.unsplash.com/photo-1572688484438-313a6e50c333?w=400&q=80' },
      { id: 10, name: 'Golden Pothos', price: 9.99,  image: 'https://images.unsplash.com/photo-1600411832946-14a5ac8c0aee?w=400&q=80' },
      { id: 11, name: 'Rubber Plant',  price: 21.99, image: 'https://images.unsplash.com/photo-1586280268958-9483002d016a?w=400&q=80' },
      { id: 12, name: 'Dracaena',      price: 19.99, image: 'https://images.unsplash.com/photo-1597305877032-0668b3c7dfe8?w=400&q=80' },
    ],
  },
  {
    name: '🌸 Flowering Plants',
    plants: [
      { id: 13, name: 'Orchid',          price: 22.99, image: 'https://images.unsplash.com/photo-1524598171353-7d22f80836f1?w=400&q=80' },
      { id: 14, name: 'African Violet',  price: 12.99, image: 'https://images.unsplash.com/photo-1620803366004-119b57f54cd6?w=400&q=80' },
      { id: 15, name: 'Anthurium',       price: 25.99, image: 'https://images.unsplash.com/photo-1616500045529-f40c9f74a50b?w=400&q=80' },
      { id: 16, name: 'Bromeliad',       price: 17.99, image: 'https://images.unsplash.com/photo-1598880940371-c756e015fea1?w=400&q=80' },
      { id: 17, name: 'Kalanchoe',       price: 10.99, image: 'https://images.unsplash.com/photo-1608827406498-d7ae8c256f54?w=400&q=80' },
      { id: 18, name: 'Flamingo Flower', price: 23.99, image: 'https://images.unsplash.com/photo-1636489951927-c3498b2b4a36?w=400&q=80' },
    ],
  },
];

export function Navbar({ cartCount }) {
  return (
    <nav className="navbar">
      <Link to="/" className="navbar-brand">🌿 Paradise Nursery</Link>
      <ul className="navbar-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/plants">Plants</Link></li>
        <li>
          <Link to="/cart" className="cart-icon-wrapper">
            🛒
            {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
          </Link>
        </li>
      </ul>
    </nav>
  );
}

function ProductList() {
  const dispatch   = useDispatch();
  const cartItems  = useSelector(selectCartItems);
  const cartCount  = useSelector(selectCartCount);

  const isInCart = (id) => cartItems.some(item => item.id === id);

  return (
    <>
      <Navbar cartCount={cartCount} />
      <div className="product-list-page">
        <h1>Our Houseplant Collection</h1>
        <p style={{ color: '#555', marginBottom: '8px' }}>
          Find your perfect green companion — grouped by type for easy browsing.
        </p>

        {categories.map((category) => (
          <div className="category-section" key={category.name}>
            <h2>{category.name}</h2>
            <div className="plants-grid">
              {category.plants.map((plant) => (
                <div className="plant-card" key={plant.id}>
                  <img src={plant.image} alt={plant.name} />
                  <div className="plant-card-body">
                    <div>
                      <div className="plant-name">{plant.name}</div>
                      <div className="plant-price">${plant.price.toFixed(2)}</div>
                    </div>
                    <button
                      className="btn-add-to-cart"
                      onClick={() => dispatch(addItem(plant))}
                      disabled={isInCart(plant.id)}
                    >
                      {isInCart(plant.id) ? '✓ Added' : 'Add to Cart'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default ProductList;
