/*jshint quotmark: false */
/*jshint white: false */
/*jshint trailing: false */
/*jshint newcap: false */
/*global React */

/// <reference path="./interfaces.d.ts"/>

import * as classNames from "classnames";
import * as React from "react";
import * as ReactDOM from "react-dom";
import { ENTER_KEY, ESCAPE_KEY } from "./constants";

class TodoItem extends React.Component<ITodoItemProps, ITodoItemState> {
	public state: ITodoItemState;

	constructor(props: ITodoItemProps) {
		super(props);
		this.state = { editText: this.props.todo.todo };
	}

	public handleSubmit(event: React.FormEvent) {
		var val = this.state.editText.trim();
		if (val) {
			this.props.onSave(val);
			this.setState({ editText: val });
		} else {
			this.props.onDestroy();
		}
	}

	public handleEdit() {
		this.props.onEdit();
		this.setState({ editText: this.props.todo.todo });
	}

	public handleKeyDown(event: React.KeyboardEvent) {
		if (event.keyCode === ESCAPE_KEY) {
			this.setState({ editText: this.props.todo.title });
			this.props.onCancel(event);
		} else if (event.keyCode === ENTER_KEY) {
			this.handleSubmit(event);
		}
	}

	public handleChange(event: React.FormEvent) {
		var input: any = event.target;
		this.setState({ editText: input.value });
	}

	/**
	 * This is a completely optional performance enhancement that you can
	 * implement on any React component. If you were to delete this method
	 * the app would still work correctly (and still be very performant!), we
	 * just use it as an example of how little code it takes to get an order
	 * of magnitude performance improvement.
	 */
	public shouldComponentUpdate(
		nextProps: ITodoItemProps,
		nextState: ITodoItemState
	) {
		return (
			nextProps.todo !== this.props.todo ||
			nextProps.editing !== this.props.editing ||
			nextState.editText !== this.state.editText
		);
	}

	/**
	 * Safely manipulate the DOM after updating the state when invoking
	 * `this.props.onEdit()` in the `handleEdit` method above.
	 * For more info refer to notes at https://facebook.github.io/react/docs/component-api.html#setstate
	 * and https://facebook.github.io/react/docs/component-specs.html#updating-componentdidupdate
	 */
	public componentDidUpdate(prevProps: ITodoItemProps) {
		if (!prevProps.editing && this.props.editing) {
			var node = ReactDOM.findDOMNode(
				this.refs["editField"]
			) as HTMLInputElement;
			node.focus();
			node.setSelectionRange(node.value.length, node.value.length);
		}
	}

	public render() {
		return (
			<li
				className={classNames({
					completed: this.props.todo.completed,
					editing: this.props.editing,
				})}
			>
				{!this.props.editing && (
					<div
						className="view"
						style={{ display: "flex", justifyContent: "space-between" }}
					>
						<div className="wrapper">
							<input
								className="toggle"
								type="checkbox"
								checked={this.props.todo.completed}
								onChange={this.props.onToggle}
							/>
							<label onDoubleClick={(e) => this.handleEdit()}>
								{this.props.todo.title}
							</label>
						</div>
						{/* @ts-ignore */}
						<div style={{ display: "flex", justifyContent: "space-between" }}>
							<div>
								{this.props.todo.tags &&
									this.props.todo.tags.map((tag) => <span>{tag}</span>)}
							</div>
							<button className="destroy" onClick={this.props.onDestroy} />
						</div>
					</div>
				)}
				<input
					ref="editField"
					className="edit"
					value={this.state.editText}
					onBlur={(e) => this.handleSubmit(e)}
					onChange={(e) => this.handleChange(e)}
					onKeyDown={(e) => this.handleKeyDown(e)}
				/>
			</li>
		);
	}
}

export { TodoItem };
