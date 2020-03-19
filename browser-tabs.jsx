var BrowserTab = React.createClass({
	render: function () {
		var title = this.props.page.title || 'loading'
		return (
			<div className={this.props.isActive ? 'active' : ''} title={title} onClick={this.props.onClick} onContextMenu={this.props.onContextMenu}>
				<img className='tab__favicon' src={this.props.page.favicon} />
				<span>
					{title}
					{this.props.page.isLoading ? <i className='ri-loader-3-line' /> : undefined}
				</span>
				<a className='tab__close' onClick={this.props.onClose}><i className='ri-close-line' /></a>
			</div>
		)
	}
})

var BrowserTabs = React.createClass({
	render: function () {
		var self = this
		return <div id="browser-tabs">
			<a className='search' onClick={this.props.onClose}><i className='ri-search-line' /></a>
			{/* <a className="minimize" onClick={this.props.onMinimize}><i className='ri-indeterminate-circle-line' /></a>
			<a className="maximize" onClick={this.props.onMaximize}><i className='ri-add-circle-line' /></a> */}
			<a className='newTab' onClick={this.props.onNewTab}><i className='ri-add-line ri-lg' /></a>
			{this.props.pages.map(function (page, i) {
				if (!page)
					return

				function onClick(e) { self.props.onTabClick(e, page, i) }
				function onContextMenu(e) { self.props.onTabContextMenu(e, page, i) }
				function onClose(e) { e.preventDefault(); e.stopPropagation(); self.props.onTabClose(e, page, i) }
				return <BrowserTab key={'browser-tab-' + i} isActive={self.props.currentPageIndex == i} page={page} onClick={onClick} onContextMenu={onContextMenu} onClose={onClose} />
			})}
		</div>
	}
})