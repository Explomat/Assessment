var React = require('react/addons');
var TextView = require('./Text').TextView;
var TableUtils = require('../../utils/TableUtils');
var LINE_HEIGHT = 35;

var GroupNode = React.createClass({

	render: function(){
		var cl = this.props.isFirst ? 'sadomia' : '';
		return(
			<li className={this.props.classes}>
				<a style={{'height':this.props.height}} className={cl + " " + this.props.classesForA}><span className='inner-sadomia'>{this.props.value}</span></a>
			</li>
		);
	}});


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
				<TextView isValidClass={this.props.isValidClass || ''} value={this.props.value} isValid={function(val) { return  val == "" || /^[1-5]$/.test(val)}} onBlur={this.handleBlur}/>
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

        var values = {
        	name: { key: 0, value: this.props.data.cols[0] },
        	groupRaiting: { key: 1, value: this.props.data.cols[1] },
        	systemRaiting: { key: 2, value: this.props.data.cols[2] },
        	bossRaiting: { key: 3, value: this.props.data.cols[3] },
        	funcBossRaiting: { key: 4, value: this.props.data.cols[4] },
        	factAllocation: { key: 5, value: this.props.data.cols[5] },
        	normAllocation: { key: 6, value: this.props.data.cols[6] }
        }

        var raitingGroupClass = parseInt(values.bossRaiting.value) !== parseInt(values.systemRaiting.value) && !this.props.data.children ? 'not-equal' : '';
        var raitingBossClass = parseInt(values.bossRaiting.value) !== parseInt(values.funcBossRaiting.value) ? 'not-equal' : '';

    	var len = this.props.data.cols.length;
    	var isFirst = this.props.isFirst || false;
    	var height = this.props.height || 0;
    	var elems = [];

    	elems.push(<Node key={values.groupRaiting.key} classes={"data" + (values.groupRaiting.key + 1)} value={values.groupRaiting.value}/>);
    	elems.push(<Node key={values.systemRaiting.key} classes={"data" + (values.systemRaiting.key + 1)} value={values.systemRaiting.value}/>);
    	elems.push(<Node key={values.bossRaiting.key} classes={"data" + (values.bossRaiting.key + 1) + " " + raitingGroupClass} value={values.bossRaiting.value}/>);

		if (!this.props.data.children){
			var firstClass = parseInt(values.factAllocation.value) > parseInt(values.normAllocation.value) ? 'over' : '';
			elems.push(<EditNode key={values.funcBossRaiting.key} id={this.props.data.id} colNumber={values.funcBossRaiting.key} classes={"data" + (values.funcBossRaiting.key + 1)} isValidClass={raitingBossClass} value={values.funcBossRaiting.value} changeColValue={this.changeColValue}/>)
			elems.push(<GroupNode key={values.factAllocation.key} classes={"data" + (values.factAllocation.key + 1)} classesForA = {firstClass} value={values.factAllocation.value+"%"} isFirst={isFirst} height={height}/>);
			elems.push(<GroupNode key={values.normAllocation.key} classes={"data" + (values.normAllocation.key + 1)} value={values.normAllocation.value+"%"} isFirst={isFirst} height={height}/>);
		}
		else {
			elems.push(<Node key={values.funcBossRaiting.key} classes={"data" + (values.funcBossRaiting.key + 1)} value={values.funcBossRaiting.value} />);
			elems.push(<Node key={values.factAllocation.key} classes={"data" + (values.factAllocation.key + 1)} value={""} />);
			elems.push(<Node key={values.normAllocation.key} classes={"data" + (values.normAllocation.key + 1)} value={""} />);
		}

		var children = TableUtils.group(this.state.children);
		var childs = [];
		children.forEach(function(ch, index){
			ch.forEach(function(c, i){
				var isFirst = i === 0 ? true : false;
				var height = isFirst ? ch.length * LINE_HEIGHT : 0;
				childs.push(<TreeNode key={c.id + index + i + Math.random(0, 1) * 10000} data={c} isExpand={this.props.isExpand} isFirst={isFirst} height={height} changeColValue={this.changeColValue} expandedNodeId={this.props.expandedNodeId} parentId={this.props.data.id} group={index}/>)
			}.bind(this));
		}.bind(this));

        return (
        	<div className="raiting-table__body">
        		<ul className="raiting-table__row">
        			<li key={values.name.key} className={classes + " data1"} onClick={this.onChildDisplayToggle}><a>{values.name.value}</a></li>
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


