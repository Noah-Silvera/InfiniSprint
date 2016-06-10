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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNsaWVudC9jb21wb25lbnRzL0FjdGlvbkxpc3QuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUdBLE9BQU8sQ0FBQyxPQUFELEVBQVMsbUJBQVQsQ0FBUCxFQUFxQyxVQUFTLEtBQVQsRUFBZSxNQUFmLEVBQXNCOzs7Ozs7Ozs7Ozs7Ozs7O0FBaUJ2RDtBQUFBOztBQUVJLDRCQUFZLEtBQVosRUFBbUI7QUFBQTs7Ozs7QUFBQSxzR0FDVCxLQURTOztBQUlmLGtCQUFLLEtBQUwsR0FBYSxFQUFFLFdBQVksTUFBSyxLQUFMLENBQVcsT0FBekIsRUFBYjtBQUplO0FBS2xCOzs7Ozs7OztBQVBMO0FBQUE7QUFBQSw0Q0Fhb0IsUUFicEIsRUFhNkI7O0FBRXJCLG9CQUFJLGNBQWMsS0FBSyxLQUFMLENBQVcsUUFBN0I7QUFDQSxvQkFBSSxpQkFBaUIsS0FBSyxLQUFMLENBQVcsY0FBaEM7O0FBRUEsb0JBQUksY0FBYyxFQUFsQjtBQUNBLHFCQUFLLEtBQUwsQ0FBVyxTQUFYLEVBQXNCLE9BQXRCLENBQStCLFVBQVMsR0FBVCxFQUFhO0FBQ3hDLHdCQUFJLFNBQVMsWUFBVCxDQUFzQixTQUF0QixNQUFxQyxJQUFJLFFBQUosQ0FBekMsRUFBdUQ7QUFDbkQsc0NBQWMsR0FBZDtBQUNIO0FBQ0osaUJBSkQ7O0FBTUEsb0JBQUksaUJBQWlCLEtBQUssS0FBTCxDQUFXLE1BQWhDOztBQUVBLG9CQUFJLFdBQVcsV0FBVyxlQUFYLENBQTJCLFdBQTNCLEVBQXVDLE1BQXZDLEVBQThDLFlBQVksUUFBWixDQUE5QyxDQUFmO0FBQ0Esb0JBQUksV0FBVyxXQUFXLGVBQVgsQ0FBMkIsV0FBM0IsRUFBdUMsTUFBdkMsRUFBOEMsU0FBUyxZQUFULENBQXNCLFNBQXRCLENBQTlDLENBQWY7O0FBRUEsMkJBQVcsZUFBWCxDQUEyQixXQUEzQixFQUF1QyxNQUF2QyxFQUE4QyxRQUE5QyxFQUF3RCxZQUFZLFFBQVosQ0FBeEQ7QUFDQSwyQkFBVyxlQUFYLENB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RFQsaUJBRlI7QUFNSDtBQTFNTDtBQUFBO0FBQUEsNENBeUM0QixNQXpDNUIsRUF5Q21DLElBekNuQyxFQXlDd0MsTUF6Q3hDLEVBeUNnRDtBQUN4QyxxQkFBSSxJQUFJLElBQUksQ0FBWixFQUFlLElBQUksT0FBTyxNQUExQixFQUFrQyxHQUFsQyxFQUF1QztBQUN2Qyx3QkFBSSxPQUFPLENBQVAsRUFBVSxRQUFWLEtBQXVCLE1BQTNCLEVBQXFDO0FBQ2pDLCtCQUFPLE9BQU8sQ0FBUCxFQUFVLElBQVYsQ0FBUDtBQUNIO0FBQ0E7QUFDSjs7OztBQS9DTDtBQUFBO0FBQUEsNENBbUQ0QixNQW5ENUIsRUFtRG1DLElBbkRuQyxFQW1Ed0MsS0FuRHhDLEVBbUQrQyxNQW5EL0MsRUFtRHVEOzs7QUFHL0MscUJBQUksSUFBSSxJQUFJLENBQVosRUFBZSxJQUFJLE9BQU8sTUFBMUIsRUFBa0MsR0FBbEMsRUFBdUM7QUFDdkMsd0JBQUksT0FBTyxDQUFQLEVBQVUsUUFBVixLQUF1QixNQUEzQixFQUFxQzs7OztBQUlqQywrQkFBTyxDQUFQLEVBQVUsSUFBVixJQUFrQixLQUFsQjtBQUVIO0FBQ0E7QUFHSjtBQWpFTDs7QUFBQTtBQUFBLE1BQWdDLE1BQU0sU0FBdEM7QUE0TUgsQ0E3TkQiLCJmaWxlIjoiY2xpZW50L2NvbXBvbmVudHMvQWN0aW9uTGlzdC5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxyXG5cclxuXHJcbmRlZmluZShbJ3JlYWN0JywnY29tcG9uZW50cy9BY3Rpb24nXSxmdW5jdGlvbihSZWFjdCxBY3Rpb24pe1xyXG4gICAgXHJcblxyXG4gICAgLy8gVGhpcyBjb21wb25lbnQgcmVuZGVycyBhIGxpc3QgZnJvbSBvYmplY3QgY29udGFpbmluZyBhIGFycmF5IG9mIGFjdGlvbiBpdGVtc1xyXG4gICAgLy8gU1RBVEVMRVNTXHJcbiAgICAvLyBQUk9QU1xyXG4gICAgLy8gKiBhY3Rpb25zXHJcbiAgICAvLyBcdFx0YW4gb2JqZWN0IG9mIGFjdGlvbiBpdGVtcyAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgLy8geyBcIml0ZW1zXCIgOiBbXHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgIFwiY29udGVudFwiOiBcImhhdmUgYSBncmVhdCBsaWZlXCIsXHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgIFwiZGF0YUlkXCI6IDAsXHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgIFwicmFua1wiOiAxXHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICB9LCAuLi5cclxuICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICBdXHJcbiAgICAvLyAqIGRhdGFJRFxyXG4gICAgLy8gXHRcdHVuaXF1ZSBJRCAgICAgICAgICAgICAgICAgICBcclxuICAgIHJldHVybiBjbGFzcyBBY3Rpb25MaXN0IGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcclxuXHJcbiAgICAgICAgY29uc3RydWN0b3IocHJvcHMpIHtcclxuICAgICAgICAgICAgc3VwZXIocHJvcHMpXHJcbiAgICAgICAgLy8gaW5pdGlhbCBzdGF0ZSBcclxuICAgICAgICAvLyB0YWtlIHRoZSBpbml0aWFsIGxpc3QgZ2l2ZW4gdG8gdGhlIEFjdGlvbkxpc3RcclxuICAgICAgICAgICAgdGhpcy5zdGF0ZSA9IHsgJ2FjdGlvbnMnIDogdGhpcy5wcm9wcy5hY3Rpb25zIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIEBwYXJhbSAge2FueX0gZHJvcEl0ZW0gVGhlIGVsZW1lbnQgdGhhdCByZXByZXNlbnRzIHRoZSBpdGVtXHJcbiAgICAgICAgICogICAgICAgICAgICAgICAgICAgICAgICB0aGUgZHJhZ0l0ZW0gd2FzIGRyb3BwZWQgb24gXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgc3dhcEFjdGlvbkl0ZW1zKGRyb3BJdGVtKXtcclxuXHJcbiAgICAgICAgICAgIHZhciBkcmFnSXRlbU9iaiA9IHRoaXMucHJvcHMuZHJhZ0l0ZW1cclxuICAgICAgICAgICAgdmFyIGRyYWdJdGVtTGlzdElkID0gdGhpcy5wcm9wcy5kcmFnSXRlbUxpc3RJZFxyXG5cclxuICAgICAgICAgICAgdmFyIGRyb3BJdGVtT2JqID0ge31cclxuICAgICAgICAgICAgdGhpcy5zdGF0ZVsnYWN0aW9ucyddLmZvckVhY2goIGZ1bmN0aW9uKG9iail7XHJcbiAgICAgICAgICAgICAgICBpZiggZHJvcEl0ZW0uZ2V0QXR0cmlidXRlKCdkYXRhLWlkJykgPT09IG9ialsnZGF0YUlkJ10pe1xyXG4gICAgICAgICAgICAgICAgICAgIGRyb3BJdGVtT2JqID0gb2JqXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgdmFyIGRyb3BJdGVtTGlzdElkID0gdGhpcy5wcm9wcy5kYXRhSWRcclxuXHJcbiAgICAgICAgICAgIHZhciBkcmFnUmFuayA9IEFjdGlvbkxpc3QuZ2V0UHJvcEJ5RGF0YUlkKGRyYWdJdGVtT2JqLCdyYW5rJyxkcmFnSXRlbU9ialsnZGF0YUlkJ10pXHJcbiAgICAgICAgICAgIHZhciBkcm9wUmFuayA9IEFjdGlvbkxpc3QuZ2V0UHJvcEJ5RGF0YUlkKGRyb3BJdGVtT2JqLCdyYW5rJyxkcm9wSXRlbS5nZXRBdHRyaWJ1dGUoJ2RhdGEtaWQnKSlcclxuXHJcbiAgICAgICAgICAgIEFjdGlvbkxpc3Quc2V0UHJvcEJ5RGF0YUlkKGRyYWdJdGVtT2JqLCdyYW5rJyxkcm9wUmFuaywgZHJhZ0l0ZW1PYmpbJ2RhdGFJZCddIClcclxuICAgICAgICAgICAgQWN0aW9uTGlzdC5zZXRQcm9wQnlEYXRhSWQoZHJvcEl0ZW1PYmosJ3JhbmsnLCBkcmFnUmFuaywgZHJvcEl0ZW0uZ2V0QXR0cmlidXRlKCdkYXRhLWlkJykgKVxyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgY29uc29sZS5sb2coJ2Rpc3BhdGNoaW5nIGRyYWcgaXRlbSB1cGRhdGUgZXZlbnRzJylcclxuICAgICAgICAgICAgdGhpcy5wcm9wcy5zb2NrZXQuZW1pdCgndXBkYXRlRXZlbnRzJywgeyAnZXZlbnQnOiBkcm9wSXRlbU9iaiwgJ2xpc3QnIDogZHJvcEl0ZW1MaXN0SWQgfSApXHJcbiAgICAgICAgICAgIHRoaXMucHJvcHMuc29ja2V0LmVtaXQoJ3VwZGF0ZUV2ZW50cycsIHsgJ2V2ZW50JzogZHJhZ0l0ZW1PYmosICdsaXN0JyA6IGRyb3BJdGVtTGlzdElkICB9IClcclxuXHJcbiAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgLy8gcmV0cmlldmVzIHRoZSBwcm9wIFwicHJvcFwiIG9mIGFuIG9iamVjdCB1c2luZyB0aGUgZGF0YUlkIGF0dHJpYnV0ZSBhcyBhIGtleVxyXG4gICAgICAgIHN0YXRpYyBnZXRQcm9wQnlEYXRhSWQgKG9iamVjdCxwcm9wLGRhdGFJZCkge1xyXG4gICAgICAgICAgICBmb3IodmFyIGkgPSAwOyBpIDwgb2JqZWN0Lmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGlmKCBvYmplY3RbaV1bXCJkYXRhSWRcIl0gPT0gZGF0YUlkICApIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBvYmplY3RbaV1bcHJvcF1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgLy8gc2V0cyB0aGUgcHJvcCBcInByb3BcIiBvZiBhbiBvYmplY3QgdG8gdmFsdWUgdXNpbmcgIGRhdGFJRCBhcyBhIGtleVxyXG4gICAgICAgIHN0YXRpYyBzZXRQcm9wQnlEYXRhSWQgKG9iamVjdCxwcm9wLHZhbHVlLCBkYXRhSWQpIHtcclxuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coXCItLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVwiKVxyXG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZyggXCJzdGFydCBvZiBzZXR0aW5nXCIgKyBKU09OLnN0cmluZ2lmeShvYmplY3QpIClcclxuICAgICAgICAgICAgZm9yKHZhciBpID0gMDsgaSA8IG9iamVjdC5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBpZiggb2JqZWN0W2ldW1wiZGF0YUlkXCJdID09IGRhdGFJZCAgKSB7XHJcbiAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhcIm9iamVjdFwiICsgSlNPTi5zdHJpbmdpZnkoIG9iamVjdFtpXSApIClcclxuICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKFwidmFsdWVcIiArIHZhbHVlKVxyXG4gICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coXCJiZWZvcmUgY2hhbmdlXCIgKyBKU09OLnN0cmluZ2lmeSggb2JqZWN0W2ldICkgKVxyXG4gICAgICAgICAgICAgICAgb2JqZWN0W2ldW3Byb3BdID0gdmFsdWVcclxuICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKFwiYWZ0ZXIgY2hhbmdlXCIgKyBKU09OLnN0cmluZ2lmeSggb2JqZWN0W2ldICkgKSAgXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSAgXHJcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKCBcImVuZCBvZiBzZXR0aW5nXCIgKyBKU09OLnN0cmluZ2lmeShvYmplY3QpIClcclxuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coXCItLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVwiKVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gcHJldmVudCBkZWZhdWx0IGJlaGF2aW91ciBhbmQgdGVsbCB0aGUgYWN0aW9uTGlzdCB0aGF0IG5vdGhpbmcgaXMgYmVpbmcgZHJhZ2dlZFxyXG4gICAgICAgIG9uRHJhZ0VuZChlKXtcclxuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpXHJcbiAgICAgICAgICAgIFJlYWN0RE9NLmZpbmRET01Ob2RlKHRoaXMpLmRpc3BhdGNoRXZlbnQoIG5ldyBDdXN0b21FdmVudCgnaXRlbURyYWdnZWQnLCB7ICdkZXRhaWwnOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJ2RyYWdJdGVtJyA6IG51bGwsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJ2RyYWdJdGVtTGlzdCc6IG51bGxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICdidWJibGVzJyA6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJ2NhbmNlbGFibGUnIDp0cnVlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KSBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApXHJcbiAgICAgICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKClcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIFRlbGxzIHRoZSBmcmFtZSB3aGF0IG9iamVjdCBpcyBiZWluZyBkcmFnZ2VkIHRvIGhhbmRsZSB0aGUgZHJvcCBsYXRlclxyXG4gICAgICAgIG9uRHJhZ1N0YXJ0KGUpe1xyXG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhjbGFzcylcclxuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coXCJkcmFnIHN0YXJ0ZWRcIilcclxuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coZS50YXJnZXQuZ2V0QXR0cmlidXRlKCdkYXRhLWlkJykpXHJcbiAgICAgICAgICAgIC8vIFxyXG4gICAgICAgICAgICB2YXIgZHJhZ0l0ZW1PYmogPSB7fVxyXG4gICAgICAgICAgICB0aGlzLnN0YXRlWydhY3Rpb25zJ10uZm9yRWFjaCggZnVuY3Rpb24ob2JqKXtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKG9iailcclxuICAgICAgICAgICAgICAgIGlmKCBlLnRhcmdldC5nZXRBdHRyaWJ1dGUoJ2RhdGEtaWQnKSA9PT0gb2JqWydkYXRhSWQnXSl7XHJcbiAgICAgICAgICAgICAgICAgICAgZHJhZ0l0ZW1PYmogPSBvYmpcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIFJlYWN0RE9NLmZpbmRET01Ob2RlKHRoaXMpLmRpc3BhdGNoRXZlbnQoIG5ldyBDdXN0b21FdmVudCgnaXRlbURyYWdnZWQnLCB7ICdkZXRhaWwnOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJ2RyYWdJdGVtJyA6IGRyYWdJdGVtT2JqLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICdkcmFnSXRlbUxpc3RJZCcgOiB0aGlzLnByb3BzLmRhdGFJZFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJ2J1YmJsZXMnIDogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJ2NhbmNlbGFibGUnIDp0cnVlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KSBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApXHJcbiAgICAgICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKClcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIFdoZW4gYSBvYmplY3QgaXMgZHJhZ2dlZCBvdmVyIGFub3RoZXIgdmFsaWQgb2JqZWN0XHJcbiAgICAgICAgb25EcmFnRW50ZXIoZSl7XHJcblxyXG4gICAgICAgICAgICAvLyBsb2NhbCB2YXJpYWJsZSB0byBjb21wbGVtZW50IHRoZSB0aGlzLnByb3BzLmRyYWdJdGVtXHJcbiAgICAgICAgICAgIHZhciBkcm9wSXRlbSA9IGUudGFyZ2V0XHJcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKFwiZHJhZ2dlZCBvdmVyIDogXCIgKyBkcm9wSXRlbSlcclxuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coXCJjdXJyZW50bHkgZHJhZ2dlZCA6IFwiICsgdGhpcy5wcm9wcy5kcmFnSXRlbSlcclxuXHJcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKFwiIC0tLSBkcm9wIGl0ZW0gPSBcIiArIGRyb3BJdGVtICsgXCIgLS0tIGRyYWcgaXRlbSA9IFwiICsgdGhpcy5wcm9wcy5kcmFnSXRlbSlcclxuICAgICAgICAgICAgLy8gRW5zdXJlIHRoYXQgdGhlIHVzZXIgaXMgZHJhZ2dpbmcgdHdvIHZhbGlkIG9iamVjdHNcclxuICAgICAgICAgICAgaWYoIGRyb3BJdGVtICE9IG51bGwgJiYgdGhpcy5wcm9wcy5kcmFnSXRlbSAhPSBudWxsKSB7XHJcblxyXG4gICAgICAgICAgICAvLyBHZXQgdGhlIGNsYXNzIG9mIGJvdGggaXRlbXNcclxuICAgICAgICAgICAgdmFyIGRyb3BJdGVtQ2xhc3MgPSBkcm9wSXRlbS5nZXRBdHRyaWJ1dGUoJ2NsYXNzJykudG9TdHJpbmcoKVxyXG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhcImRyb3AgaXRlbSBjbGFzcyA9IFwiICsgZHJvcEl0ZW1DbGFzcylcclxuXHJcbiAgICAgICAgICAgIC8vIGZpbHRlciBhY3Rpb24gaXRlbXMgKCBleGNsdWRlIGFjdGlvbkxpc3RzIClcclxuICAgICAgICAgICAgdmFyIGFjdGlvblJlZ2V4ID0gbmV3IFJlZ0V4cChcIiggfF4pYWN0aW9uKCB8JClcIilcclxuXHJcbiAgICAgICAgICAgIC8vIGJvdGggYWN0aW9uIGNsYXNzZXNcclxuICAgICAgICAgICAgaWYgKCBhY3Rpb25SZWdleC5leGVjKGRyb3BJdGVtQ2xhc3MpICE9IG51bGwgKXtcclxuICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKCdib3RoIGFjdGlvbiBjbGFzc2VzJylcclxuICAgICAgICAgICAgICAgIC8vIGhhdmUgdW5pcXVlIGlkJ3NcclxuICAgICAgICAgICAgICAgIGlmKCBkcm9wSXRlbS5nZXRBdHRyaWJ1dGUoJ2RhdGEtaWQnKSAhPSB0aGlzLnByb3BzLmRyYWdJdGVtWydkYXRhSWQnXSApe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnZHJhZ2dlZCBvdmVyIHZhbGlkIGRyb3AgdGFyZ2V0JylcclxuICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKCdoYXZlIHVuaXF1ZSBpZHMnKVxyXG4gICAgICAgICAgICAgICAgLy8gc3dhcCB0aGUgYWN0aW9uIGl0bWVzXHJcbiAgICAgICAgICAgICAgICB0aGlzLnN3YXBBY3Rpb25JdGVtcyhkcm9wSXRlbSlcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSBcclxuICAgICAgICAgICAgLy8gT3BwdXJ0dW5pdHkgaGVyZSB0byBpbXBsZW1lbnQgZHJhZyB3aXRoIG90aGVyIHR5cGVzIG9mIG9iamVjdHNcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy8gUHJldmVudCB0aGUgYnJvd3NlcnMgZGVmYXVsdCBkcmFnIGFuZCBkcm9wIGJlaGF2aW91ciBmcm9tIG9jY3VyaW5nXHJcbiAgICAgICAgICAgIGlmIChlLnByZXZlbnREZWZhdWx0KSB7XHJcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgb25EcmFnTGVhdmUoZSl7XHJcblxyXG4gICAgICAgICAgICAvLyBhY3Rpb25MaXN0IGlzIGEgY2xhc3Mgb2YgdGhlIHRhcmdldFxyXG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhlLnRhcmdldClcclxuICAgICAgICAgICAgaWYoZS50YXJnZXQuZ2V0QXR0cmlidXRlKCdjbGFzcycpLmluZGV4T2YoJ2FjdGlvbkxpc3QnKSA+IC0xICl7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnbGVmdCB2YWxpZCBkcmFnIHRhcmdldCcpXHJcbiAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhlLnRhcmdldC5nZXRBdHRyaWJ1dGUoJ2NsYXNzJykpO1xyXG4gICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coJ2Rpc3BhdGNoaW5nIGRyYWcgbGVhdmUgZXZlbnQnKVxyXG4gICAgICAgICAgICAgICAgUmVhY3RET00uZmluZERPTU5vZGUodGhpcykuZGlzcGF0Y2hFdmVudCggbmV3IEN1c3RvbUV2ZW50KCdpdGVtTGVhdmUnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7ICdkZXRhaWwnOiB0aGlzLnByb3BzLmRyYWdJdGVtLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJ2J1YmJsZXMnIDogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICdjYW5jZWxhYmxlJzp0cnVlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApXHJcbiAgICAgICAgICAgICAgICAgICAgKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKClcclxuXHJcbiAgICAgICAgICAgIHRoaXMuZGVsZXRlQWN0aW9uKGUudGFyZ2V0KVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZGVsZXRlQWN0aW9uKGFjdGlvbil7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnByb3BzLnNvY2tldC5lbWl0KCdkZWxldGVFdmVudCcsIHsgJ2V2ZW50JyA6IGFjdGlvbiB9KVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmVuZGVyKCkge1xyXG5cclxuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coSlNPTi5zdHJpbmdpZnkodGhpcy5wcm9wcy5hY3Rpb25zKSApXHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBpZiAoIHRoaXMucHJvcHMuYWN0aW9ucy5sZW5ndGggPT0gMCApIHtcclxuICAgICAgICAgICAgICAgIC8vIFBsYWNlaG9sZGVyIG1lc3NhZ2UgaWYgbm8gYWN0aW9ucyBhcmUgcHJlc2VudCBpbiB0aGUgb2JqZWN0XHJcbiAgICAgICAgICAgICAgICBhY3Rpb25FbGVtcyA9ICggPHAgY2xhc3NOYW1lID0gXCJwbGFpblRleHRcIiA+WW91IGhhdmUgbm90aGluZyB0byBkbyAuLi4uIDwvcD4gKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuXHJcbiAgICAgICAgICAgICAgICAvLyBTb3J0cyB0aGUgZ2l2ZW4gbGlzdCBvZiBhY3Rpb24gaXRlbXMgYnkgcmFuayBhc2NlbmRpbmcgb3JkZXIgdmVydGljYWxseVxyXG4gICAgICAgICAgICAgICAgdmFyIHNvcnRlZEFjdGlvbnMgPSB0aGlzLnByb3BzLmFjdGlvbnMuc29ydCggZnVuY3Rpb24oIG9uZSx0d28gKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuICggb25lLnJhbmsgLSB0d28ucmFuayApXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICAvLyBtYXBzIGVhY2ggYWN0aW9uIGluIHRoZSBvYmplY3QgdG8gYSBBY3Rpb24gY29tcG9uZW50IHRvIHJlbmRlclxyXG4gICAgICAgICAgICAgICAgLy8gcGFzc2luZyBkb3duIHRoZSBkYXRhSWQgcHJvcGVydHkgZm9yIGRyYWcgZXZlbnQgaGFuZGxpbmdcclxuICAgICAgICAgICAgICAgIHZhciBhY3Rpb25FbGVtcyA9IHNvcnRlZEFjdGlvbnMubWFwKCBmdW5jdGlvbihhY3Rpb24pIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8QWN0aW9uIGtleSA9IHthY3Rpb24uZGF0YUlkfSBkYXRhSWQgPSB7YWN0aW9uLmRhdGFJZH0gY29udGVudD17YWN0aW9uLmNvbnRlbnR9ICByYW5rID0ge2FjdGlvbi5yYW5rfS8+XHJcbiAgICAgICAgICAgICAgICAgICAgKTtcdFxyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvLyByZW5kZXJzIGFuIGFjdGlvbkxpc3QgdXNpbmcgdGhlIGFjdGlvbiBpdGVtcyBnaXZpbmcgd2l0aCBhIHVuaXF1ZSBkYXRhSUQgdG8gZGlzdHVpbmd1aXNoIGl0IGluIGl0J3MgcGFyZW50IGNvbnRhaW5lclxyXG4gICAgICAgICAgICByZXR1cm4gKFxyXG5cclxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZSA9IFwiYWN0aW9uTGlzdFwiIGRhdGEtaWQgPSB7dGhpcy5wcm9wcy5kYXRhSWR9IG9uRHJhZ1N0YXJ0ID0ge3RoaXMub25EcmFnU3RhcnR9IG9uRHJhZ0VudGVyID0ge3RoaXMub25EcmFnRW50ZXJ9IG9uRHJhZ0VuZCA9IHt0aGlzLm9uRHJhZ0VuZH0gb25EcmFnTGVhdmUgPSB7dGhpcy5vbkRyYWdMZWF2ZX0gPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge2FjdGlvbkVsZW1zfVxyXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59KSJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
