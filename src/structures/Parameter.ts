import { Text } from './Text'
import { Token } from './Token'
import { TokenList } from './utils/TokenList'
import { TokenType } from './utils'

export class Parameter<K extends string | number = string | number> extends Token {
	public name: K
	public value: Token | TokenList
	public override type = TokenType.Parameter

	public constructor( name: K, ...value: Array<Token | string> ) {
		super()
		this.name = name

		const values = value.map( item => typeof item === 'string' ? new Text( item ) : item )
		const last = values.at( -1 )
		if ( values.length === 1 && last ) {
			this.value = last
		} else {
			this.value = new TokenList( ...values )
		}
	}

	public isNamed(): this is Parameter<string> {
		return typeof this.name === 'string'
	}

	public isUnnamed(): this is Parameter<number> {
		return typeof this.name === 'number'
	}

	public toString() {
		if ( typeof this.name === 'number' ) {
			return `|${ this.value }`
		} else {
			return `|${ this.name }=${ this.value }`
		}
	}
}
