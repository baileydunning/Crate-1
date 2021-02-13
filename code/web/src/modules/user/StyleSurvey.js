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
import { login, setUserStyle } from './api/actions'
import { getSurveyList } from '../product/api/actions'
import { getList, create } from '../subscription/api/actions'
import { messageShow, messageHide } from '../common/api/actions'

class StyleSurvey extends Component {
  
  constructor(props) {
    super(props)
    this.state = {
      questionNum: 1,
      products: [],
      shirt: null,
      pants: null,
      shoes: null,
      dressOrVest: null,
      hat: null,
      accessories: null
    }
  }

  componentDidMount = async () => {
    this.props.getList()
    .then(() => {
      let gender = this.props.subscriptions.list[this.props.subscriptions.list.length - 1].crate.gender
      this.props.getSurveyList(gender)
      .then(() => {
        this.setState({
          products: this.props.surveyProducts.list
        })
      })
    })
  }

  selectProductsOnDisplay = () => {
    return this.state.products.filter(product => {
      if (this.state.questionNum === 1) {
        return product.sub_type === 'Shirt'
      } else if (this.state.questionNum === 2) {
        return product.sub_type === 'Pants'
      } else if (this.state.questionNum === 3) {
        return product.sub_type === 'Shoes'
      } else if (this.state.questionNum === 4) {
        return product.sub_type === 'Dress' || product.sub_type === 'Vest'
      } else if (this.state.questionNum === 5) {
        return product.sub_type === 'Hat'
      } else if (this.state.questionNum === 6) {
        return product.sub_type === 'Accessories'
      }
    })
  }

  createProductInputs = () => {
    const productsOnDisplay = this.selectProductsOnDisplay()
    if (productsOnDisplay) {
      return productsOnDisplay.map(product => {
        let subType = product.sub_type.toLowerCase()
        if (product.sub_type === 'Dress' || product.sub_type === 'Vest') {
          subType = 'dressOrVest'
        }
        return(
          <label key={product.style}>
            <input
              type='radio'
              name={subType}
              value={product.style}
              checked={this.state[subType] === product.style ? true : false}
              onChange={this.handleRadioClick}
            />
            <img 
              src={product.image}
              alt={product.name}
              style={{width: '20vw'}}
            />
          </label>
        )
      })
    }
  }

  handleRadioClick = (e) => {
    let key = e.target.name.toLowerCase()
    if (key.includes('dressorvest')) {
      key = 'dressOrVest'
    }
    this.setState({
      [key]: e.target.value
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

  handleSubmit = () => {
    this.props.setUserStyle(this.props.user, this.returnDominantStyle())
    // this.props.login(this.props.user)
    this.props.history.push(userRoutes.subscriptions.path)
    this.props.messageShow(`Thanks for your submission! Your style is ${this.returnDominantStyle()}`)
    window.setTimeout(() => {
      this.props.messageHide()
    }, 5000)
  }

  returnDominantStyle = () => {
    const chosenStyles = [this.state.shirt, this.state.pants, this.state.shoes, this.state.accessories, this.state.hat, this.state.dressOrVest]
    const activeStyles = chosenStyles.filter(style => {
      return style !== null
    })
    return activeStyles.sort((a, b) => {
      return activeStyles.filter(style => style === a).length - activeStyles.filter(style => style === b).length
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
              onClick={() => this.handleSubmit()}>
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
    user: state.user,
    surveyProducts: state.surveyProducts,
    subscriptions: state.subscriptions
  }
}
export default connect(styleSurveyState, { getList, create, messageShow, messageHide, getSurveyList, setUserStyle, login })(withRouter(StyleSurvey))