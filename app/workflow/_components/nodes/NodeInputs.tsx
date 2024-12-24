export function NodeInputs({ children }: { children: React.ReactNode }) {
    return(
        <div className="flex flex-col dividy-y gap-2">
            {children}
        </div>
    )
}

export function NodeInput({ input }: { input: any}) {
    return (
        <div>
            {input.name}
        </div>
    )
}