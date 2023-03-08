import * as Models from './structures'
import fs from 'fs'
import path from 'path'
import peg from 'peggy'

const grammar = fs.readFileSync( path.resolve( __dirname, '../grammars/default.peggy' ) ).toString()

export const parser = peg.generate( grammar )

export const parse = ( text: string ): Models.TokenList => {
	const nodes = parser.parse( text, Models ) as Models.Token[]
	return new Models.TokenList( ...nodes )
}
