export type TransportWithRelations = {
    id: number;
    transport_z: string;
    transport_do: string;
    numer_tel_zleceniodawcy: string;
    pracownik_zlecenie_przewozu_kierownik_idTopracownik: { imie: string; nazwisko: string } | null;
    pracownik_zlecenie_przewozu_pracownik_idTopracownik: { imie: string; nazwisko: string } | null;
};

export type CeremonyWithRelations = {
	id: number;
	miejscowosc: string;
	data_pogrzebu: Date;
	rodzaj_pochowku: string;
	zmarly: { imie: string; nazwisko: string } | null;
	zleceniodawca: { imie: string; nazwisko: string } | null;
};