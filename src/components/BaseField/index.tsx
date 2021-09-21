import React from "react";
import './styles.scss'

export default function BaseField(props: {
	label?: string
}) {
	return (
		<div className="base-field">
			{
				props.label && <div className="base-field__title">
					{props.label}
        </div>
			}
			<div className="base-field__body">
				<input type="text"/>
			</div>
		</div>
	);
}
