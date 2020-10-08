var BrowserNavbarBtn = React.createClass({
	render: function () {
		return <a href="#" className={this.props.disabled ? 'disabled' : ''} title={this.props.title} onClick={this.props.onClick}><i className={'ri-' + this.props.icon} /></a>
	}
})

var BrowserNavbarLocation = React.createClass({

	onKeyDown: function (e) {

		if (e.keyCode == 13)
			if (e.target.value.match(/^(?:(?:(?:[a-zA-z\-]+)\:\/{1,3})?(?:[a-zA-Z0-9])(?:[a-zA-Z0-9-\.]){1,61}[a-zA-Z0-9](?:\.[a-zA-Z]{2,})+|\[(?:(?:(?:[a-fA-F0-9]){1,4})(?::(?:[a-fA-F0-9]){1,4}){7}|::1|::)\]|(?:(?:[0-9]{1,3})(?:\.[0-9]{1,3}){3}))(?:\:[0-9]{1,5})?/))
				if (!e.target.value.startsWith('https://'))
					this.props.onEnterLocation('https://' + e.target.value)
				else
					this.props.onEnterLocation(e.target.value)
			else
				this.props.onEnterLocation('https://duckduckgo.com/?q=' + e.target.value)


	},
	onChange: function (e) {
		this.props.onChangeLocation(e.target.value)
	},
	render: function () {
		return <input type="text" onKeyDown={this.onKeyDown} onChange={this.onChange} onContextMenu={this.props.onContextMenu} value={this.props.page.location} />
	}
})

var BrowserNavbar = React.createClass({
	render: function () {
		return <div id="browser-navbar">
			{/* <BrowserNavbarBtn title="Rewind" icon='home-3-line' onClick={this.props.onClickHome} disabled={!this.props.page.canGoBack} /> */}
			<BrowserNavbarBtn title="Back" icon='arrow-left-line' onClick={this.props.onClickBack} disabled={!this.props.page.canGoBack} />
			<BrowserNavbarBtn title="Forward" icon='arrow-right-line' onClick={this.props.onClickForward} disabled={!this.props.page.canGoForward} />
			<BrowserNavbarBtn title="Refresh" icon='refresh-line' onClick={this.props.onClickRefresh} disabled={!this.props.page.canRefresh} />
			<div className="input-group">
				<div className='icon'>
					<i className={'ri-search-line'} />
				</div>
				<BrowserNavbarLocation onEnterLocation={this.props.onEnterLocation} onChangeLocation={this.props.onChangeLocation} onContextMenu={this.props.onLocationContextMenu} page={this.props.page} />
				<div className='icon'>
					<i className={'ri-star-line'} />
				</div>
			</div>
		</div>
	}
})