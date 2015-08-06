var React = require('react/addons');

var TreeNode = React.createClass({

	expandNode: function() {
		this.setState({children: this.props.data.children});
	},

	turnNode: function(){
		this.setState({children: null});
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

        return (
            <li className={classes} onClick={this.onChildDisplayToggle}>
                <a onClick={this.onCategorySelect}>
                    {this.props.data.name}
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

    getDefaultProps:function() {
    	return {
    		isExpand: false
    	}
    },

	componentWillMount: function() {
		this.setState({data: this.props.data});
	},

    render: function() {
        return (
            <ul className="category-tree">
            	{this.props.data.map(function(tree) {
		    		return <TreeNode key={tree.id} data={tree} isExpand={this.props.isExpand}/>
		    	}.bind(this))}
            </ul>
        );
    }
});
module.exports = CategoryTree;

