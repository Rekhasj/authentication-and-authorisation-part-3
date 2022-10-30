import {Component} from 'react'
import cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import ProductCard from '../ProductCard'
import './index.css'

class AllProductsSection extends Component {
  state = {
    productsList: [],
    isLoader: true,
  }

  componentDidMount() {
    this.getProducts()
  }

  getProducts = async () => {
    const token = cookies.get('jwt_token')
    const apiUrl = 'https://apis.ccbp.in/products'
    const options = {headers: {Authorization: `Bearer ${token}`}, method: 'GET'}
    const response = await fetch(apiUrl, options)

    if (response.ok === true) {
      const fetchedData = await response.json()
      const updatedData = fetchedData.products.map(product => ({
        brand: product.brand,
        id: product.brand,
        title: product.title,
        price: product.price,
        imageUrl: product.image_url,
        rating: product.rating,
      }))

      this.setState({productsList: updatedData, isLoader: false})
    }
  }

  renderProductsList = () => {
    const {productsList, isLoader} = this.state
    return (
      <div>
        <h1 className="products-list-heading">All Products</h1>
        {isLoader ? (
          <div className="products-loader-container">
            <Loader type="TailSpin" color="#00bfff" height={50} width={50} />
          </div>
        ) : (
          <ul className="products-list">
            {productsList.map(product => (
              <ProductCard productData={product} key={product.id} />
            ))}
          </ul>
        )}
      </div>
    )
  }

  render() {
    return <>{this.renderProductsList()}</>
  }
}

export default AllProductsSection
