var React = require('react/addons');
var TextView = require('./Text').TextView;
var TableUtils = require('../../utils/TableUtils');
var MAX_ELEMS = 5;

var GroupNode = React.createClass({

	render: function(){
		var cl = this.props.isFirst ? 'sadomia' : '';
		return(
			<li className={this.props.classes + " " + this.props.classesForA}>
				<a style={{'height':this.props.height}} className={cl + " " + this.props.classesForA}><span className='sadomia2'>{this.props.value}</span></a>
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
				<TextView isValidClass={this.props.isValidClass || ''} value={this.props.value} isValid={function(val) { return val == "" || /^[1-5]$/.test(val)}} onBlur={this.handleBlur}/>
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
    	if (this.props.changeColValue){
    		this.props.changeColValue(id, colNumber, val);
    	}
    },

    render: function () {
    	if (!this.state.children) this.state.children = [];

    	var classes = React.addons.classSet({
            'open': (this.state.children.length ? true : false),
            'closed': (this.state.children ? false : true)
        });

    	var name = this.props.data.cols[0];
    	var len = this.props.data.cols.length;
    	var isFirst = this.props.isFirst || false;
    	var height = this.props.height || 0;
    	var elems = [];

    	for (var i = 1; i < len - 4; i++) {
			if (TableUtils.isEditCol(this.props.data.edit, i)){
				elems.push(<EditNode key={i} id={this.props.data.id} colNumber={i} classes={classes + " data" + (i + 2)} value={this.props.data.cols[i]} changeColValue={this.changeColValue}/>);
			}
			else {
				elems.push(<Node key={i} classes={classes + " data" + (i + 2)} value={this.props.data.cols[i]}/>);
			}
		}

		var firstRaitingVal = parseInt(this.props.data.cols[len-4]) || 0;
		var secondRaitingVal = parseInt(this.props.data.cols[len-3]) || 0;
		var raitingClass = firstRaitingVal !== secondRaitingVal ? 'not-equal' : '';

		elems.push(<Node key={len-4} classes={classes + " data" + (len-2)} value={this.props.data.cols[len-4]}/>);
		elems.push(<EditNode key={len-3} id={this.props.data.id} colNumber={len-3} classes={classes + " data" + (len-1)} isValidClass={raitingClass} value={this.props.data.cols[len-3]} changeColValue={this.changeColValue}/>);

		var firstVal = parseInt(this.props.data.cols[len-2]);
		var secondVal = parseInt(this.props.data.cols[len-1]);
		var firstClass = firstVal > secondVal && this.props.len > MAX_ELEMS ? 'over' : '';
		elems.push(<GroupNode key={len-2} classes={classes + " data" + len} classesForA = {firstClass} value={firstVal+"%"} isFirst={isFirst} height={height}/>);
		elems.push(<GroupNode key={len-1} classes={classes + " data" + (len + 1)} value={secondVal+"%"} isFirst={isFirst} height={height}/>)

        return (
        	<div className="raiting-table__body">
        		<ul className="raiting-table__row">
        			<li key={0} className={classes + " data1"} onClick={this.onChildDisplayToggle}><a>{name}</a></li>
		            {elems}
	            </ul>
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

    changeColValue: function(id, colNumber, val){
    	if (this.props.changeValue)
    		this.props.changeValue(id, colNumber, val);
    },

    render: function() {
    	var elements = TableUtils.group(this.props.data);
		var elems = [];
		elements.forEach(function(ch, index){
			ch.forEach(function(c, i){
				var isFirst = i === 0 ? true : false;
				var height = isFirst ? ch.length * 35 : 0;
				elems.push(<TreeNode key={c.id + index + i} data={c} isExpand={this.props.isExpand} changeColValue={this.changeColValue} isFirst={isFirst} height={height} len={this.props.data.length}/>)
			}.bind(this));
		}.bind(this));
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
	            	{elems}
			    </div>
	        </div>
        );
    }
});
module.exports = CategoryTree;


