import { Subject, Observable } from 'rxjs';

export abstract class Item {

	/**
	 * Può significare che l'oggetto è stato usato,
	 * è andato distrutto o si è rotto al termine della durabilità.
	 */
	readonly disposed$: Observable<void>

	protected disposedSubject: Subject<void>;

	constructor(
		readonly id: integer,
		readonly name: string,
		readonly description: string,
	) {
		this.disposedSubject = new Subject();
		this.disposed$ = this.disposedSubject.asObservable();
	}

}
