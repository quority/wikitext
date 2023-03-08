import type { Link } from './Link'
import type { Parameter } from './Parameter'
import type { Template } from './Template'
import type { Text } from './Text'
import { TokenType } from './utils'

export abstract class Token {
	public abstract toString(): string
	public abstract readonly type: TokenType

	public isLink(): this is Link {
		return this.type === TokenType.Link
	}

	public isParameter(): this is Parameter {
		return this.type === TokenType.Parameter
	}

	public isTemplate(): this is Template {
		return this.type === TokenType.Template
	}

	public isText(): this is Text {
		return this.type === TokenType.Text
	}
}
