import React from 'react'
import { useLocation } from 'react-router-dom';

export default function AdvDetailView() {
    const state = useLocation();

  return (
    <div>AdvDetailView: {state.toString()}</div>
  )
}
