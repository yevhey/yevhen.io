import React, { forwardRef } from 'react'

export const SearchInput = forwardRef(({ value, onChange }: { value: string, onChange: () => void }, ref) => <input ref={ref} value={value} onChange={onChange} />)