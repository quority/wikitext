import { Token } from './Token'
import { TokenType } from './utils'

export class Text extends Token {
	#value: string
	public override type = TokenType.Text

	public constructor( value: string ) {
		super()
		this.#value = value
	}

	public get value(): string {
		return this.#value
	}

	public set value( value: string ) {
		this.#value = value
	}

	public setEnd( text: string ): this {
		if ( text.trim().length !== 0 ) {
			throw new Error( 'Added text must be trimmable.' )
		}
		this.#value = `${ this.value.trimEnd() }${ text }`
		return this
	}

	public setStart( text: string ): this {
		if ( text.trim().length !== 0 ) {
			throw new Error( 'Added text must be trimmable.' )
		}
		this.#value = `${ text }${ this.value.trimStart() }`
		return this
	}

	public toString(): string {
		return this.value
	}
}
