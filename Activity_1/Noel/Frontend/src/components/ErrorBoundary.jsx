import { Component } from 'react';
import { Link } from 'react-router-dom';

export default class ErrorBoundary extends Component {
	state = { hasError: false };

	static getDerivedStateFromError() {
		return { hasError: true };
	}

	render() {
		if (this.state.hasError) return <main className="shell"><section className="card p-6"><p className="eyebrow text-black">Terminal recovery</p><h1 className="mt-2 text-2xl font-semibold">SESSION INTERRUPTED</h1><p className="mt-3 text-sm text-black">The current view could not be loaded. Your account and cart have not been changed.</p><Link className="btn-secondary mt-5" to="/marketplace" onClick={() => this.setState({ hasError: false })}>Return to marketplace</Link></section></main>;
		return this.props.children;
	}
}
