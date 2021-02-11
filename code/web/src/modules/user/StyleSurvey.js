// Imports
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Helmet } from 'react-helmet'
import { Link, withRouter } from 'react-router-dom'

// UI Imports
import { Grid, GridCell } from '../../ui/grid'
import { H3, H4 } from '../../ui/typography'
import Button from '../../ui/button'
import { grey, grey2 } from '../../ui/common/colors'

// App Imports
import userRoutes from '../../setup/routes/user'
import { sampleSurveyData } from './SurveyProducts'
import { setUserStyle } from './api/actions'
import { getSurveyList } from '../product/api/actions'

class StyleSurvey extends Component {
  
  constructor(props) {
    super(props)
    this.state = {
      questionNum: 6,
      products: [],
      shirt: null,
      pants: null,
      shoes: null,
      dressOrVest: null,
      hat: null,
      accessories: null
    }
  }

  componentDidMount() {
    this.setState({
      products: sampleSurveyData.data
    })
  }

  selectProductsOnDisplay = () => {
    return this.state.products.filter(product => {
      if (this.state.questionNum === 1) {
        return product.category === 'shirt'
      } else if (this.state.questionNum === 2) {
        return product.category === 'pants'
      } else if (this.state.questionNum === 3) {
        return product.category === 'shoes'
      } else if (this.state.questionNum === 4) {
        return product.category === 'dress' || product.category === 'vest'
      } else if (this.state.questionNum === 5) {
        return product.category === 'hat'
      } else if (this.state.questionNum === 6) {
        return product.category === 'accessories'
      }
    })
  }

  createProductInputs = () => {
    const productsOnDisplay = this.selectProductsOnDisplay()
    if (productsOnDisplay) {
      return productsOnDisplay.map(product => {
        return(
          <label key={product.style}>
            <input
              type='radio'
              name={product.category}
              value={product.style}
              onChange={this.handleRadioClick}
            />
            <img 
              src={product.imgUrl} 
              alt={product.description}
              style={{width: '20vw'}} 
            />
          </label>
        )
      })
    }
  }

  handleRadioClick = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleNavClick = (type) => {
    if (type === 'decrease') {
      this.setState({
        questionNum: this.state.questionNum - 1
      })
    } else {
      this.setState({
        questionNum: this.state.questionNum + 1
      })
    }
  }

  returnDominantStyle = () => {
    const chosenStyles = [this.state.shirt, this.state.pants, this.state.shoes, this.state.accessories, this.state.hat, this.state.dressOrVest]
    const activeStyles = chosenStyles.filter(style => {
      return style !== null
    })
    return activeStyles.sort((a, b) => {
      return activeStyles.filter(style => style === b).length - activeStyles.filter(style => style === a).length
    }).pop()
  }

  render() {
    return(
      <section style={{marginTop: '5%'}}>
        <Helmet>
          <title>What's your style?</title>
        </Helmet>
        <Grid style={{ backgroundColor: grey }}>
          <GridCell style={{ padding: '2em', textAlign: 'center' }}>
            <H3 font="secondary">What's your style?</H3>
          </GridCell>
        </Grid>
        <form
          style={{display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', placeItems: 'center'}}
        >
          {this.createProductInputs()}
        </form>
        <Grid style={{ backgroundColor: grey }}>
          <GridCell style={{ padding: '2em', textAlign: 'center' }}>
            {this.state.questionNum !== 1 && <Button
              theme='primary'
              onClick={() => this.handleNavClick('decrease')}
            >
              ←
            </Button>}
          </GridCell>
          <GridCell style={{ padding: '2em', textAlign: 'center' }}>
            <p>Question {this.state.questionNum}/6</p>
          </GridCell>
          <GridCell style={{ padding: '2em', textAlign: 'center' }}>
            {this.state.questionNum === 6 ? 
            <Button
              theme='primary'
              onClick={() => setUserStyle(this.props.user, this.returnDominantStyle())}>
              SUBMIT
            </Button>
            :
            <Button
              theme='primary'
              onClick={() => this.handleNavClick('increase')}>
              →
            </Button>
            }
          </GridCell>
        </Grid>
      </section>
    )
  }


}

function styleSurveyState(state) {
  return {
    user: state.user
  }
}
export default connect(styleSurveyState)(withRouter(StyleSurvey))