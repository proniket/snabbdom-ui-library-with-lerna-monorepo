import {
	h,
	init,
	classModule,
	propsModule,
	eventListenersModule,
} from 'snabbdom';

const patch = init([classModule, propsModule, eventListenersModule]);

// Initial state
let state = {
	count: 0,
};

// Function to update state and re-render the UI
function updateState(newState) {
	state = { ...state, ...newState };
	console.log('New state:', state.count);
	render();
}

// Function to render the UI
function render() {
	const vnode = createTemplate(state);
	// console.log('Rendering:', vnode);
	const appElement = document.getElementById('app');
	appElement.innerHTML = '';

	// console.log('App element:', appElement);
	patch(appElement, vnode);
	// console.log('UI updated');
}

// Template for the view
function createTemplate(state) {
	return h('div#app', [
		h('h1', `Count: ${state.count}`),
		h(
			'button',
			{
				on: { click: incrementCount },
			},
			'Increment'
		),
	]);
}

// Handle increment count event
function incrementCount() {
	updateState({ count: state.count + 1 });
}

// Lifecycle hook for component mounting
function useEffect(callback, dependencies) {
	const didMount = () => callback();
	didMount(); // Call the callback function on component mount
}

// Console log message for when the component is mounted
useEffect(() => {
	console.log('Component mounted');
}, []);

// Initial UI Render
document.addEventListener('DOMContentLoaded', () => {
	console.log('DOM content loaded');
	render();
});
