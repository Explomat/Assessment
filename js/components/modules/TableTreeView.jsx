var React = require('react/addons');
var TextView = require('./Text').TextView;
var TableUtils = require('../../utils/TableUtils');

var GroupNode = React.createClass({

	render: function(){
		var cl = this.props.isFirst ? 'sadomia' : '';
		return(
			<li className={this.props.classes + " " + this.props.classesForA}>
				<a style={{'height':this.props.height}} className={cl + " " + this.props.classesForA}><span className='inner-sadomia'>{this.props.value}</span></a>
			</li>
		);
	}
});

var Node = React.createClass({

	render: function(){
		return(
			<li className={this.props.classes}>
				<a>{this.props.value}</a>
			</li>
		);
	}
});

var EditNode = React.createClass({

	handleBlur: function(val){
		if (this.props.changeColValue)
			this.props.changeColValue(this.props.id, this.props.colNumber, val);
	},

	render: function(){
		return(
			<li className={this.props.classes}>
				<TextView value={this.props.value} isValid={function(val) { return  val == "" || /^[1-5]$/.test(val)}} onBlur={this.handleBlur}/>
			</li>
		);
	}
});

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

	componentWillReceiveProps: function(nextProps) {
	  this.setState({children: nextProps.children});
	  if (nextProps.isExpand !== this.props.isExpand){
	  	if (nextProps.isExpand){
	  		this.expandNode();
	  	}
	  	else{
	  		this.turnNode();
	  	}
	  }
	  if (nextProps.expandedNodeId == this.props.data.id)
	  	this.expandNode();
	},

    componentDidMount: function(){
    	if (this.props.isExpand)
	    	this.expandNode();
	    else
	    	this.turnNode();
    },

    onChildDisplayToggle: function(e){
    	if (this.state.children.length === 0)
    		this.expandNode();
    	else
    		this.turnNode();
    	e.preventDefault();
	    e.stopPropagation();
    },

    changeColValue: function(id, colNumber, val){
    	console.log(this.props.parentId);
    	if (this.props.changeColValue){
    		this.props.changeColValue(id, colNumber, val, this.props.parentId || this.props.data.id);
    	}
    },

    render: function () {
    	if (!this.state.children) this.state.children = [];

    	var classes = React.addons.classSet({
            'has-children': (this.props.data.children ? true : false),
            'open': (this.state.children.length ? true : false),
            'closed': (this.state.children ? false : true)
        });

    	var name = this.props.data.cols[0];
    	var len = this.props.data.cols.length;
    	var isFirst = this.props.isFirst || false;
    	var height = this.props.height || 0;
    	var elems = [];

    	for (var i = 1; i < len - 2; i++) {
			if (TableUtils.isEditCol(this.props.data.edit, i) && !this.props.data.children){
				elems.push(<EditNode key={i} id={this.props.data.id} colNumber={i} classes={classes + " data" + (i + 2)} value={this.props.data.cols[i]} changeColValue={this.changeColValue}/>);
			}
			else {
				elems.push(<Node key={i} classes={classes + " data" + (i + 2)} value={this.props.data.cols[i]}/>);
			}
		}

		var firstVal = parseInt(this.props.data.cols[len-2]);
		var secondVal = parseInt(this.props.data.cols[len-1]);
		var firstClass = firstVal > secondVal ? 'over' : '';
		elems.push(<GroupNode key={len-2} classes={classes + " data" + len} classesForA = {firstClass} value={firstVal+"%"} isFirst={isFirst} height={height}/>);
		elems.push(<GroupNode key={len-1} classes={classes + " data" + (len + 1)} value={secondVal+"%"} isFirst={isFirst} height={height}/>)

		var children = TableUtils.group(this.state.children);
		var childs = [];
		children.forEach(function(ch, index){
			ch.forEach(function(c, i){
				var isFirst = i === 0 ? true : false;
				var height = isFirst ? ch.length * 35 : 0;
				childs.push(<TreeNode key={c.id + index + i + Math.random(0,1)} data={c} isExpand={this.props.isExpand} isFirst={isFirst} height={height} changeColValue={this.changeColValue} expandedNodeId={this.props.expandedNodeId} parentId={this.props.data.id}/>)
			}.bind(this));
		}.bind(this));

        return (
        	<div className="raiting-table__body">
        		<ul className="raiting-table__row">
        			<li key={0} className={classes + " data1"} onClick={this.onChildDisplayToggle}><a>{name}</a></li>
		            {elems}
	            </ul>
                <div>
                	{childs}
                </div>
            </div>
        );
    }
});

var CategoryTree = React.createClass({

    getDefaultProps: function() {
    	return {
    		isExpand: false,
    		data: []
    	}
    },

    changeColValue: function(id, colNumber, val, parentId){
    	if (this.props.changeValue)
    		this.props.changeValue(id, colNumber, val, parentId);
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
				<div className="raiting-table--scroll category-tree">
	            	{this.props.data.map(function(tree) {
			    		return <TreeNode key={tree.id} data={tree} isExpand={this.props.isExpand} changeColValue={this.changeColValue} expandedNodeId={this.props.expandedNodeId}/>
			    	}.bind(this))}
			    </div>
	        </div>
        );
    }
});
module.exports = CategoryTree;


