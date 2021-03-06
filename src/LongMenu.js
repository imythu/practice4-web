import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Link from "@material-ui/core/Link"

const options = [
	"home",
	"myCollections",
	"relatedToMe",
	"popular",
];
const memus = {
	home: {
		url: "/index.html",
		name: "主页",
	},
	myCollections: {
		url: "/myCollections/index.html",
		name: "我的收藏",
	},
	relatedToMe: {
		url: "/relatedToMe/index.html",
		name: "与我相关",
	},
	popular: {
		url: "/populararticle/index.html",
		name: "热门贴子",
	},
};

const ITEM_HEIGHT = 48;

class LongMenu extends React.Component {
	state = {
		anchorEl: null,
	};

	handleClick = event => {
		this.setState({ anchorEl: event.currentTarget });
	};

	handleClose = () => {
		this.setState({ anchorEl: null });
	};

	render() {
		const { anchorEl } = this.state;
		const open = Boolean(anchorEl);

		return (
			<div>
				<IconButton
					aria-label="More"
					aria-owns={open ? 'long-menu' : undefined}
					aria-haspopup="true"
					onClick={this.handleClick}
				>
					<MoreVertIcon />
				</IconButton>
				<Menu
					id="long-menu"
					anchorEl={anchorEl}
					open={open}
					onClose={this.handleClose}
					PaperProps={{
						style: {
							maxHeight: ITEM_HEIGHT * 4.5,
							width: 200,
						},
					}}
				>
					{options.map(option => (
						<MenuItem key={option} onClick={this.handleClose}>
							<Link href={memus[option].url}>
								{memus[option]['name']}
							</Link>
						</MenuItem>
					))}
				</Menu>
			</div>
		);
	}
}

export default LongMenu;