const Product = require('../models/product');
const Cart = require('../models/cart');

exports.getProducts = (req, res, next) => {
  Product.getAll((products) => {
      res.render('shop/product-list', {
      prods: products,
      pageTitle: 'All Products',
      path: '/products'
    });
  });
};

exports.getProduct = (req, res, next) => {
  const prodId = req.params.productId;
  console.log(prodId)
  Product.get(prodId, (product) => {
    res.render('shop/product-detail', {
      product: product,
      pageTitle: product.name,
      path: '/products'
    });
  })
};

exports.getIndex = (req, res, next) => {
  Product.getAll((products) => {
    res.render('shop/index', {
      prods: products,
      pageTitle: 'All Products',
      path: '/products'
    });
  })
};

exports.getCart = (req, res, next) => {
  const ids = [];
  req.cart.products.forEach(prod => {
    ids.push(prod._id);
  })
  Product.getMany(ids, cartProducts => {
    res.render('shop/cart', {
      path: '/cart',
      pageTitle: 'Your Cart',
      products: cartProducts,
      cart: req.cart
    })
  })
}


exports.postCart = (req, res, next) => {
  req.cart.addProduct(req.body.productId);
  req.cart.update(() => res.redirect('/cart'));
};

exports.postCartDeleteProduct = (req, res, next) => {
  console.log("fnuck")
  const prodId = req.body.productId;
  req.cart.deleteItem(prodId, () => {
    res.redirect('/cart');
  });
};

// exports.postOrder = (req, res, next) => {
//   req.user.getCart()
//     .then(cart => {
//       return cart.getProducts();
//     }).then(products => {
//       return req.user
//         .createOrder()
//         .then(order => {
//           order.addProducts(products.map(product => {
//             product.orderItem = { quantity: product.cartitem.quantity };
//             return product;
//            }))
//         })
//         .catch(err => console.log(err))

//      }).then(() => {
//        req.cart.destroy('products')
//      }).then((result) => {
//         res.redirect('/orders');
//     }).catch(err => console.log(err))
// };

// exports.getOrders = (req, res, next) => {
//   req.user.getOrders({ include: ['products'] })
//     .then(orders => {
//       console.log(orders[1])
//       res.render('shop/orders', {
//         path: '/orders',
//         pageTitle: 'Your Orders',
//         orders: orders
//       });
//     })
  
// };

