import React, { forwardRef } from 'react'

export const SearchInput = forwardRef(({ value, onChange }: { value: string, onChange: ({ target: { value } }: { target: { value: string } }) => void }, ref: { current: HTMLInputElement }) => <input ref={ref} value={value} onChange={onChange} />)

SearchInput.displayName = 'SearchInput'
