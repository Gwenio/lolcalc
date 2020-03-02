/*
ISC License (ISC)

Copyright 2020 James Adam Armstrong

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted, provided that the above copyright
notice and this permission notice appear in all copies.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY AND
FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
*/

import morph from 'nanomorph'
import { RenderQueue } from './batch'

/** The base class for components. */
export abstract class Component {
	/** The root HTML elements of the component. */
	private element: HTMLElement | null = null
	/** The RenderQueue of the component. */
	private manager: RenderQueue | null = null

	/** Renders the component's HTML. */
	protected abstract render(): HTMLElement

	/** Called to queue for rendering. */
	protected dirty(): void {
		if (this.manager) {
			this.manager.dirty(this)
		} else {
			this.display()
		}
	}

	/** Cancels any queued renders of the component. */
	protected cancel(): void {
		if (this.manager) {
			this.manager.cancel(this)
		}
	}

	/** Updates the display of the component. */
	public display(): void {
		this.element = morph(this.element, this.render())
	}

	/** Gets the component's root HTML element. */
	public get html(): HTMLElement {
		if (!this.element) {
			this.element = this.render()
		}
		return this.element
	}

	/** Sets the RenderQueue to be used. */
	public set batch(batch: RenderQueue | null) {
		if (this.manager !== batch) {
			this.cancel()
			this.manager = batch
			this.dirty()
		}
	}
}
