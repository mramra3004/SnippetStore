import React from 'react'
import FAIcon from '@fortawesome/react-fontawesome'
import i18n from 'render/lib/i18n'
import TagItem from 'render/components/tag-item'
import ContextMenu from 'render/lib/context-menu'
import _ from 'lodash'
import './snippet-item'

export default class SnippetItem extends React.Component {
  pickSnippet () {
    const { store, snippet } = this.props
    store.selectedSnippet = snippet
  }

  handleContextMenu () {
    const { config, store, snippet } = this.props
    ContextMenu.popup([
      {
        label: i18n.__('delete snippet'),
        click () {
          if (config.ui.showDeleteConfirmDialog) {
            if (!confirm(i18n.__('Are you sure to delete this snippet?'))) {
              return
            }
          }
          const newSnippet = _.clone(snippet)
          store.deleteSnippet(newSnippet)
          store.selectedSnippet = null
        }
      }
    ])
  }

  render () {
    const { snippet, selected } = this.props
    return (
      <div
        className={`snippet-item list-and-detail ${selected ? 'selected' : ''}`}
        onContextMenu={() => this.handleContextMenu(snippet)}
        onClick={() => this.pickSnippet()}
      >
        <p className="name">
          <span className="icon">
            {snippet.files ? (
              <FAIcon icon="copy" />
            ) : (
              <FAIcon icon="file-code" />
            )}
          </span>
          {snippet.name}
        </p>
        <p className="m-t-10">
          {snippet.tags.map((tag, index) => <TagItem tag={tag} key={index} />)}
        </p>
      </div>
    )
  }
}
