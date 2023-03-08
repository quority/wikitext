import { Text } from './Text'
import { Token } from './Token'
import { TokenType } from './utils'

export class Link extends Token {
	public display?: Text
	public target: Text
	public override type = TokenType.Link

	public constructor( target: string, display?: string ) {
		super()
		this.target = new Text( target )
		if ( display ) this.display = new Text( display )
	}

	public toString(): string {
		if ( this.display ) {
			return `[[${ this.target }|${ this.display }]]`
		}
		return `[[${ this.target }]]`
	}
}
