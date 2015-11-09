import React, { Component } from 'react'
import { createStore } from 'refer'

if (!Object.assign) {
	Object.assign = (target, ...args) => {
		args.forEach(source => {
			for (let key in source) {
				if (!source.hasOwnProperty(key)) {
					continue
				}
				target[key] = source[key]
			}
		})
		return target
	}
}

let setState = nextState => state => Object.assign({}, state, nextState)
let setStateMiddleware = { setState }

export default class ViewModel extends Component {
	constructor(props, context) {
		super(props, context)
		let handlers = [this.getHandlers(), setStateMiddleware]
		let store = this.$store = createStore(handlers)
		this.dispatch = store.dispatch
		this.actions = store.actions
		this.unbind = store.subscribe(() => this.forceUpdate())
	}
	getHandlers() {
		return {}
	}
	get state() {
		return this.$store.getState()
	}
	set state(nextState) {
		this.$store.replaceState(nextState, true)
	}
	setState(nextState, callback) {
		let { $store, state, props } = this
		if (isFn(nextState)) {
			nextState = nextState(state, props)
		}
		this.$store.dispatch('setState', nextState)
		if (isFn(callback)) {
			callback()
		}
	}
}

