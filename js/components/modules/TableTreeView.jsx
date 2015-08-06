var React = require('react/addons');

var TreeNode = React.createClass({

	expandNode: function() {
		this.setState({children: this.props.data.children});
	},

	turnNode: function(){
		this.setState({ children: null });
	},

	getInitialState: function(){
		return {
			children: this.props.data.children || []
		}
	},

    componentDidMount: function(){
    	if (this.props.isExpand)
	    	this.expandNode();
	    else
	    	this.turnNode();
    },

    onCategorySelect: function(e){
    	e.preventDefault();
	    e.stopPropagation();
    },

    onChildDisplayToggle: function(e){
    	if (this.state.children.length === 0)
    		this.expandNode();
    	else
    		this.turnNode();
    	e.preventDefault();
	    e.stopPropagation();
    },

    render: function () {
    	if (!this.state.children) this.state.children = [];

    	var classes = React.addons.classSet({
            'has-children': (this.props.data.children ? true : false),
            'open': (this.state.children.length ? true : false),
            'closed': (this.state.children ? false : true)
        });

    	var name = this.props.data.cols[0] || '';
        return (
            <li className={classes} onClick={this.onChildDisplayToggle}>
                <a onClick={this.onCategorySelect}>
                    {name}
                </a>
                <ul>
                	{this.state.children.map(function(child, index) {
				    	return <TreeNode key={child.id + index} data={child} isExpand={this.props.isExpand}/>;
				    }.bind(this))}
                </ul>
            </li>
        );
    }
});

var CategoryTree = React.createClass({

	getInitialState: function() {
        return { data: [] };
    },

    getDefaultProps: function() {
    	return {
    		isExpand: false
    	}
    },

	componentWillMount: function() {
		this.setState({data: this.props.data});
	},

    render: function() {
        return (
        	<div className="table-container">
        		<div className="header">
					<ul className="raiting-table__header">
						{this.props.header.map(function(h, index){
							return <li key={"hli" + index} className={"data" + (index + 1)}><span>{h}</span></li>
						})}
					</ul>
				</div>
				<div className="raiting-table--scroll">
					<table className="raiting-table__body">
						<tbody>
				            <ul className="category-tree">
				            	{this.props.data.map(function(tree) {
						    		return <TreeNode key={tree.id} data={tree} isExpand={this.props.isExpand}/>
						    	}.bind(this))}
				            </ul>
				        </tbody>
				    </table>
				</div>
	        </div>
        );
    }
});
module.exports = CategoryTree;

