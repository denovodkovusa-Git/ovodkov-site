'use client'

import React, { Component, ErrorInfo, ReactNode } from 'react'

interface Props {
    children: ReactNode
}

interface State {
    hasError: boolean
}

class ErrorBoundary extends Component<Props, State> {
    public state: State = {
        hasError: false,
    }

    public static getDerivedStateFromError(_: Error): State {
        return { hasError: true }
    }

    public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.error('Uncaught error:', error, errorInfo)
    }

    public render() {
        if (this.state.hasError) {
            return (
                <div style={{ padding: '2rem', textAlign: 'center', color: '#fff' }}>
                    <h2>Something went wrong in the Admin UI.</h2>
                    <button
                        type="button"
                        onClick={() => this.setState({ hasError: false })}
                        style={{ marginTop: '1rem', padding: '0.5rem 1rem', background: '#FF6600', border: 'none', color: '#fff', cursor: 'pointer' }}
                    >
                        Try again
                    </button>
                </div>
            )
        }

        return this.props.children
    }
}

export default ErrorBoundary
