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

/** The minimal interface of a renderable component. */
interface Component {
	/** Displays an updated version of the component. */
	display(): void
}

/** The interface for the RenderQueue. */
export interface RenderQueue {
	/** Adds a component that needs updating to the queue. */
	dirty(comp: Component): void
	/** Removes a component from the queue. */
	cancel(comp: Component): void
}

/** An implementation of a RenderQueue. */
export default class Batch implements RenderQueue {
	/** The list of pending components. */
	private pending: (Component | null)[] = []

	/** Adds a component that needs updating to the queue. */
	public dirty(comp: Component): void {
		if (!this.pending.includes(comp)) {
			this.pending.push(comp)
		}
	}

	/** Removes a component from the queue. */
	public cancel(comp: Component): void {
		const index = this.pending.indexOf(comp)
		if (index >= 0) {
			this.pending[index] = null
		}
	}

	/** Renders the pending components. */
	public update(): void {
		this.pending.forEach((x: Component | null): void => {
			x && x.display()
		})
		this.pending = []
	}
}
