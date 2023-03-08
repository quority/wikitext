import type { Link } from '../Link'
import type { Template } from '../Template'
import { Text } from '../Text'
import { Token } from '../Token'

export class TokenList<T extends Token = Token> {
	public nodes: T[] = []

	public constructor( ...nodes: Array<T | TokenList<T>> ) {
		for ( const node of nodes ) {
			if ( node instanceof Token ) {
				const last = this.nodes.at( -1 )
				if ( last instanceof Text && node instanceof Text ) {
					last.value += node.value
				} else {
					this.nodes.push( node )
				}
			} else {
				this.nodes.push( ...node.nodes )
			}
		}
	}

	public get links(): TokenList<Link> {
		const list = this.nodes.filter( n => n.isLink() ) as unknown as Link[]
		return new TokenList<Link>( ...list )
	}

	public get templates(): TokenList<Template> {
		const list = this.nodes.filter( n => n.isTemplate() ) as unknown as Template[]
		return new TokenList<Template>( ...list )
	}

	public findTemplate( name: string, namespace = 'Template' ): Template | null {
		name = name.toLowerCase().replace( /_/g, ' ' )
		namespace = namespace.toLowerCase().replace( /_/g, ' ' )

		const template = this.nodes.find( node => {
			if ( !node.isTemplate() ) return false
			const template = node.name.toLowerCase().replace( /_/g, ' ' )
			return template === name || template === `${ namespace }:${ name }`
		} )
		return template?.isTemplate() ? template : null
	}

	public append( node: T ) {
		const last = this.nodes.at( -1 )
		if ( node.isText() && last?.isText() ) {
			last.value = `${ last.value }${ node.value }`
		} else {
			this.nodes.push( node )
		}
	}

	public prepend( node: T ) {
		const first = this.nodes.at( 0 )
		if ( node.isText() && first?.isText() ) {
			first.value = `${ node.value }${ first.value }`
		} else {
			this.nodes.unshift( node )
		}
	}

	public toString(): string {
		return this.nodes.map( i => i.toString() ).join( '' )
	}
}
