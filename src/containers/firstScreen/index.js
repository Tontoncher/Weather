import React, { Component } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons'

export default class FirstScreen extends Component {

  state = {
    text: '',
  }

  createTownList = () => {
    let list = this.props.townList.map((item) => {
      let className = 'town-list-item'
      let deleteButton
      if (item.name == this.props.activeTown) {
        className += ' activeItem'
        deleteButton =  <button
                          key='deleteButton'
                          onClick={() => this.props.deleteTown(item.name)}
                        >
                          <FontAwesomeIcon icon={ faTrashAlt } />
                        </button>

        // return (
        //   <button
        //     key={item.name}
        //     onClick={() => this.props.onChangeActivePanel(2, item.name)}
        //     onDoubleClick={() => this.props.onChangeActivePanel(2, item.name)}
        //     className={className}
        //   >
        //     <span className='name'>
        //       { item.name }, {item.sys.country}
        //     </span>
        //     <div>
        //       <span className='temp'>
        //         { item.main.temp }°C
        //       </span>
        //       { deleteButton }
        //     </div>
        //   </button>
        // )
      }

      return (
        <button
          key={item.name}
          onClick={() => this.props.onChangeActiveTown(item.name)}
          onDoubleClick={() => this.props.onChangeActivePanel(2, item.name)}
          className={className}
        >
          <span className='name'>
            { item.name }, {item.sys.country}
          </span>
          <div>
            <span className='temp'>
              { item.main.temp }°C
            </span>
            { deleteButton }
          </div>
        </button>
      )
    })

    let groupList = []
    let group = []

    let lastTitle = ''
    list.map((item) => {
      let firstSign = item.props.children[0].props.children[0][0]
      if (lastTitle != firstSign) {
        groupList = [...groupList, {id:lastTitle, data:group}]

        group = [item]
        lastTitle = firstSign
      }
      else {
        group = [...group, item]
      }
    })
    groupList = [...groupList, {id:lastTitle, data:group}]
    groupList.splice(0, 1)

    let newList = []

    groupList.map((item) => {
      let title = <span key={item.id} className='title'>{ item.id }</span>
      newList = [...newList, title]

      item.data.map((i) => {
        newList = [...newList, i]
      })
    })

    return newList
  }
  onChangeText = (value) => {
    this.setState({text: value})
  }
  onSearch = () => {
    this.props.addTown(this.state.text)
    this.setState({text: ''})
  }

  render() {
    let townList = this.createTownList()

    return (
      <div className='panel-1'>
        <div className='first'>
          <div className='location'>Location</div>
          <div className='white-shadow'>
            <div className='search-bar'>
              <input
                value={ this.state.text }
                onChange={ (e) => this.onChangeText(e.target.value) }
              />
              <button
                onClick={ () => this.onSearch() }
              >
                <FontAwesomeIcon icon={ faMapMarkerAlt } />
              </button>
            </div>
          </div>
          <div className='town-list'>
            { townList }
          </div>
        </div>
      </div>
    )
  }
}
