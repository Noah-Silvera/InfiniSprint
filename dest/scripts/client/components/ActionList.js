'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

define(['react', 'components/Action'], function (React, Action) {

    // This component renders a list from object containing a array of action items
    // STATELESS
    // PROPS
    // * actions
    // 		an object of action items       
    // { "items" : [
    //                       {
    //                         "content": "have a great life",
    //                         "dataId": 0,
    //                         "rank": 1
    //                       }, ...
    //                     ]
    // * dataID
    // 		unique ID                  
    return function (_React$Component) {
        _inherits(ActionList, _React$Component);

        function ActionList(props) {
            _classCallCheck(this, ActionList);

            // initial state
            // take the initial list given to the ActionList

            var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(ActionList).call(this, props));

            _this.state = { 'actions': _this.props.actions };
            return _this;
        }

        /**
         * @param  {any} dropItem The element that represents the item
         *                        the dragItem was dropped on 
         */


        _createClass(ActionList, [{
            key: 'swapActionItems',
            value: function swapActionItems(dropItem) {

                var dragItemObj = this.props.dragItem;
                var dragItemListId = this.props.dragItemListId;

                var dropItemObj = {};
                this.state['actions'].forEach(function (obj) {
                    if (dropItem.getAttribute('data-id') === obj['dataId']) {
                        dropItemObj = obj;
                    }
                });

                var dropItemListId = this.props.dataId;

                var dragRank = ActionList.getPropByDataId(dragItemObj, 'rank', dragItemObj['dataId']);
                var dropRank = ActionList.getPropByDataId(dropItemObj, 'rank', dropItem.getAttribute('data-id'));

                ActionList.setPropByDataId(dragItemObj, 'rank', dropRank, dragItemObj['dataId']);
                ActionList.setPropByDataId(dropItemObj, 'rank', dragRank, dropItem.getAttribute('data-id'));

                console.log('dispatching drag item update events');
                this.props.socket.emit('updateEvents', { 'event': dropItemObj, 'list': dropItemListId });
                this.props.socket.emit('updateEvents', { 'event': dragItemObj, 'list': dropItemListId });
            }

            // retrieves the prop "prop" of an object using the dataId attribute as a key

        }, {
            key: 'onDragEnd',

            // console.log("after change" + JSON.stringify( object[i] ) ) 

            // console.log( "end of setting" + JSON.stringify(object) )
            // console.log("-----------------------------")


            // prevent default behaviour and tell the actionList that nothing is being dragged
            value: function onDragEnd(e) {
                e.preventDefault();
                ReactDOM.findDOMNode(this).dispatchEvent(new CustomEvent('itemDragged', { 'detail': {
                        'dragItem': null,
                        'dragItemList': null
                    },
                    'bubbles': true,
                    'cancelable': true
                }));
                e.stopPropagation();
            }

            // Tells the frame what object is being dragged to handle the drop later

        }, {
            key: 'onDragStart',
            value: function onDragStart(e) {
                // console.log(class)
                // console.log("drag started")
                // console.log(e.target.getAttribute('data-id'))
                //
                var dragItemObj = {};
                this.state['actions'].forEach(function (obj) {
                    console.log(obj);
                    if (e.target.getAttribute('data-id') === obj['dataId']) {
                        dragItemObj = obj;
                    }
                });
                ReactDOM.findDOMNode(this).dispatchEvent(new CustomEvent('itemDragged', { 'detail': {
                        'dragItem': dragItemObj,
                        'dragItemListId': this.props.dataId
                    },
                    'bubbles': true,
                    'cancelable': true
                }));
                e.stopPropagation();
            }

            // When a object is dragged over another valid object

        }, {
            key: 'onDragEnter',
            value: function onDragEnter(e) {

                // local variable to complement the this.props.dragItem
                var dropItem = e.target;
                // console.log("dragged over : " + dropItem)
                // console.log("currently dragged : " + this.props.dragItem)

                // console.log(" --- drop item = " + dropItem + " --- drag item = " + this.props.dragItem)
                // Ensure that the user is dragging two valid objects
                if (dropItem != null && this.props.dragItem != null) {

                    // Get the class of both items
                    var dropItemClass = dropItem.getAttribute('class').toString();
                    // console.log("drop item class = " + dropItemClass)

                    // filter action items ( exclude actionLists )
                    var actionRegex = new RegExp("( |^)action( |$)");

                    // both action classes
                    if (actionRegex.exec(dropItemClass) != null) {
                        // console.log('both action classes')
                        // have unique id's
                        if (dropItem.getAttribute('data-id') != this.props.dragItem['dataId']) {
                            console.log('dragged over valid drop target');
                            // console.log('have unique ids')
                            // swap the action itmes
                            this.swapActionItems(dropItem);
                        }
                    }
                    // Oppurtunity here to implement drag with other types of objects
                }

                // Prevent the browsers default drag and drop behaviour from occuring
                if (e.preventDefault) {
                    e.preventDefault();
                }

                e.stopPropagation();
            }
        }, {
            key: 'onDragLeave',
            value: function onDragLeave(e) {

                // actionList is a class of the target
                // console.log(e.target)
                if (e.target.getAttribute('class').indexOf('actionList') > -1) {
                    console.log('left valid drag target');
                    // console.log(e.target.getAttribute('class'));
                    // console.log('dispatching drag leave event')
                    ReactDOM.findDOMNode(this).dispatchEvent(new CustomEvent('itemLeave', { 'detail': this.props.dragItem,
                        'bubbles': true,
                        'cancelable': true
                    }));
                }
                e.stopPropagation();

                this.deleteAction(e.target);
            }
        }, {
            key: 'deleteAction',
            value: function deleteAction(action) {
                this.props.socket.emit('deleteEvent', { 'event': action });
            }
        }, {
            key: 'render',
            value: function render() {

                // console.log(JSON.stringify(this.props.actions) )

                if (this.props.actions.length == 0) {
                    // Placeholder message if no actions are present in the object
                    actionElems = React.createElement(
                        'p',
                        { className: 'plainText' },
                        'You have nothing to do .... '
                    );
                } else {

                    // Sorts the given list of action items by rank ascending order vertically
                    var sortedActions = this.props.actions.sort(function (one, two) {
                        return one.rank - two.rank;
                    });

                    // maps each action in the object to a Action component to render
                    // passing down the dataId property for drag event handling
                    var actionElems = sortedActions.map(function (action) {
                        return React.createElement(Action, { key: action.dataId, dataId: action.dataId, content: action.content, rank: action.rank });
                    });
                }

                // renders an actionList using the action items giving with a unique dataID to distuinguish it in it's parent container
                return React.createElement(
                    'div',
                    { className: 'actionList', 'data-id': this.props.dataId, onDragStart: this.onDragStart, onDragEnter: this.onDragEnter, onDragEnd: this.onDragEnd, onDragLeave: this.onDragLeave },
                    actionElems
                );
            }
        }], [{
            key: 'getPropByDataId',
            value: function getPropByDataId(object, prop, dataId) {
                for (var i = 0; i < object.length; i++) {
                    if (object[i]["dataId"] == dataId) {
                        return object[i][prop];
                    }
                }
            }

            // sets the prop "prop" of an object to value using  dataID as a key

        }, {
            key: 'setPropByDataId',
            value: function setPropByDataId(object, prop, value, dataId) {
                // console.log("-----------------------------")
                // console.log( "start of setting" + JSON.stringify(object) )
                for (var i = 0; i < object.length; i++) {
                    if (object[i]["dataId"] == dataId) {
                        // console.log("object" + JSON.stringify( object[i] ) )
                        // console.log("value" + value)
                        // console.log("before change" + JSON.stringify( object[i] ) )
                        object[i][prop] = value;
                    }
                }
            }
        }]);

        return ActionList;
    }(React.Component);
});