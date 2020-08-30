import React, { useRef, Ref, useImperativeHandle, forwardRef } from 'react';
import styles from './Button.module.scss';

type ButtonStyles = 'hollow';

export interface ButtonProps {
	children: any;
	onClick?: any;
	style?: ButtonStyles;
}

export interface ButtonRef {
	button: HTMLButtonElement | null;
}

const Button = forwardRef((props: ButtonProps, ref: Ref<ButtonRef>) => {
	const buttonRef = useRef<HTMLButtonElement>(null);
	const classNames = [
		styles.button,
		props.style === 'hollow' && styles.hollow,
	];

	useImperativeHandle(
		ref,
		(): ButtonRef => ({
			button: buttonRef.current,
		})
	);

	return (
		<button
			className={classNames.join(' ')}
			onClick={props.onClick}
			ref={buttonRef}
		>
			{props.children}
		</button>
	);
});

export default Button;
