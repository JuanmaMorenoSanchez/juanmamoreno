import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';
import { VALIDTRAITS } from '@domain/artwork/artwork.constants';
import { Nft, NftThumbnail } from '@domain/artwork/artwork.entity';
import { SessionState } from '@shared/entities/session.model';
import DateUtils from '@shared/utils/date.utils';
import { SessionStore } from './session.store';

@Injectable({ providedIn: 'root' })
export class SessionQuery extends Query<SessionState> {
    getArtPiecesObservable = this.select(({ artPieces }) => [...artPieces]);

    constructor(protected override store: SessionStore) {
        super(store);
    }

    get selectArtPieces(): Array<Nft> {
        return this.getValue().artPieces
    }

    get selectLastArtPiecesUpdate() {
        return this.getValue().lastArtPiecesUpdate
    }

    get years(): Set<number> {
        return new Set(
            this.getValue().artPieces?.map((artPiece) => {
                return Number(artPiece.raw.metadata!['attributes'].find((trait: any)  => trait['trait_type'] === VALIDTRAITS.YEAR)!['value'])
            }).filter(year => year).sort().reverse() as Array<number>
        );
    }

    get canvasWeatherData(): any | undefined {
        const daysBeforeExpireData = 1;
        const weatherDataTime = this.getValue().canvasDataWeather?.fetchTime;
        const invalidDate = weatherDataTime ? DateUtils.olderThanNDays(weatherDataTime, daysBeforeExpireData) : true;
        return !weatherDataTime || invalidDate ? undefined : this.getValue().canvasDataWeather?.data
    }

    get canvasStockData(): any | undefined {
        const daysBeforeExpireData = 1;
        const stockDataTime = this.getValue().canvasDataStock?.fetchTime;
        const invalidDate = stockDataTime ? DateUtils.olderThanNDays(stockDataTime, daysBeforeExpireData) : true;
        return !stockDataTime || invalidDate ? undefined : this.getValue().canvasDataStock?.data
    }

    getThumbnailByTokenId(tokenId: string): NftThumbnail | undefined {
        return this.getValue().imageCache.find(thumbnail => thumbnail.tokenId === tokenId);
    }
}