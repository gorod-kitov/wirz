import { createMuiTheme } from '@material-ui/core';

const PRIMAY_COLOR_BLUE = '#0075ff';

export const theme = createMuiTheme({
	typography: {
		fontFamily: "'Karla', sans-serif",
	},
	overrides: {
		MuiFormLabel: {
			root: {
				'&$focused': {
					color: '#000'
				}
			}
		},
		MuiFilledInput: {
			input: {
				padding: '12px 10px'
			},
			underline: {
				'&:after': {
					borderBottom: '2px solid #000'
				}
			},
		},
		MuiCard: {
			root: {
				borderRadius: '2px',
				boxShadow: '1px 1px 2px rgba(0, 0, 0, 0.1)',
				transition: '.15s ease-out'
			},

		},
		MuiOutlinedInput: {
			notchedOutline: {
				borderColor: '#000 !important'
			},
		},
		MuiPaper: {
			elevation8: {
				boxShadow: '0px 3px 15px -8px rgba(0,0,0,0.15)'
			}
		},
		MuiAutocomplete: {

		},
		MuiInput: {
			underline: {
				'&:after': {
					borderBottom: '2px solid #000'
				}
			},
			input: {
				letterSpacing: '0.2px',
			}
		},
		MuiFormControlLabel: {
			label: {
				fontSize: '14px'
			}
		},
		MuiCheckbox: {
			colorPrimary: {
				'&$checked': {
					color: PRIMAY_COLOR_BLUE
				}
			}
		},
		MuiButton: {
			outlined: {
				borderRadius: 0,
				padding: '6px 16px'
			}
		}
	},
}); 