function Section({ id, title, description, children, icon }) {
    return (
        <div id={id}>
            {icon && (
                <svg className="icon" role="presentation" aria-hidden="true">
                    <use href={`/icons.svg#${icon}`} />
                </svg>
            )}
            <h2>{title}</h2>
            <p>{description}</p>
            <ul>{children}</ul>
        </div>
    );
}

export default Section;