import { Parameter } from './Parameter'
import { Text } from './Text'
import { Token } from './Token'
import { TokenList } from './utils/TokenList'
import { TokenType } from './utils'

export class Template extends Token {
	public name: string
	public parameters: Parameter[]
	public override type = TokenType.Template

	public constructor( name: string, ...parameters: Parameter[] ) {
		super()
		this.name = name
		this.parameters = parameters
	}

	public getParameter<K extends string | number>( name: K ): Parameter<K> | null {
		const parameter = this.parameters.find( p => p.name === name )
		return parameter as Parameter<K> | undefined ?? null
	}

	public setParameter( name: string | number, value: string | Token ): this {
		value = typeof value === 'string' ? new Text( value ) : value
		const parameter = this.getParameter( name )
		if ( parameter ) {
			parameter.value = value
		} else {
			const parameter = new Parameter( name, value )
			this.parameters.push( parameter )
		}
		return this
	}

	public prettify(): void {
		this.name = `${ this.name.trim() }\n`
		const maxLength = this.parameters.reduce( ( maxLength, parameter ) => {
			if ( parameter.isNamed() ) {
				return Math.max( maxLength, parameter.name.length + 1 )
			}
			return maxLength
		}, 0 )

		for ( const parameter of this.parameters ) {
			if ( parameter.isNamed() ) {
				const spaces = ' '.repeat( maxLength - parameter.name.length )
				parameter.name = ` ${ parameter.name }${ spaces }`
				if ( parameter.value instanceof TokenList ) {
					parameter.value.prepend( new Text( ' ' ) )
					parameter.value.append( new Text( '\n' ) )
				} else if ( parameter.value.isText() ) {
					parameter.value.setStart( ' ' ).setEnd( '\n' )
				} else {
					parameter.value = new TokenList( new Text( ' ' ), parameter.value, new Text( '\n' ) )
				}
			} else if ( parameter.isUnnamed() ) {
				parameter.value = new TokenList( new Text( ' ' ), parameter.value, new Text( '\n' ) )
			}
		}
	}

	public toString(): string {
		return `{{${ this.name }${ this.parameters.join( '' ) }}}`
	}
}
