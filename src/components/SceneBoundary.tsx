import { Component } from 'react'
import type { ReactNode, ErrorInfo } from 'react'
export class SceneBoundary extends Component<{ children: ReactNode; onFallback: () => void }, { failed: boolean }> {
  state = { failed: false }
  static getDerivedStateFromError() { return { failed: true } }
  componentDidCatch(_error: Error, _info: ErrorInfo) { this.props.onFallback() }
  render() { return this.state.failed ? null : this.props.children }
}
