# Dummy Data for Amazon Clone

## Product Images

- https://m.media-amazon.com/images/I/71raTffvoRL._AC_UL480_FMwebp_QL65_.jpg

- https://m.media-amazon.com/images/I/71raTffvoRL._AC_UL480_FMwebp_QL65_.jpg

- https://m.media-amazon.com/images/I/41aaJolcLZL._AC_UL480_FMwebp_QL65_.jpg

- https://m.media-amazon.com/images/I/71f7TY4NH9S._AC_UL480_FMwebp_QL65_.jpg

- https://m.media-amazon.com/images/I/61FOldEmviL._AC_UL480_FMwebp_QL65_.jpg

- https://m.media-amazon.com/images/I/719wpVqXagL._AC_UL480_FMwebp_QL65_.jpg

- https://m.media-amazon.com/images/I/71VHR5DvVDL._AC_UL480_FMwebp_QL65_.jpg

- https://m.media-amazon.com/images/I/614TW8uDuyL._AC_UL480_FMwebp_QL65_.jpg

- https://m.media-amazon.com/images/I/71LWPMoZKeL._AC_UL480_FMwebp_QL65_.jpg

## Files
- **products.ts**: A list of products having:
  - id
  - title
  - image
  - avgRating
  - ratings
  - price
  - oldPrice (optional)
- **product.ts**: Product details
  - id
  - title
  - *description*
  - image
  - *images* (array of images)
  - *options* (array if possible variation/options)
  - avgRating
  - ratings
  - price
  - oldPrice (optional)
- **cart.ts**: Items in the cart
  - id
  - item
  - quantity
  - option (selected option)