import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'
import Categories from './Categories'

export default class ListItem extends Component {
  render() {
    const { node, categories } = this.props
    return (
      <>

          {node.data.date} — {categories && <Categories categories={categories} />}

        <Link to={node.uid}>{node.data.title.text}</Link>
      </>
    )
  }
}

ListItem.propTypes = {
  node: PropTypes.object.isRequired,
  categories: PropTypes.array.isRequired,
}
