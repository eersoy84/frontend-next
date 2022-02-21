import { useSession } from 'next-auth/react';
import NumberFormat from 'react-number-format';
function addressInfo(item, badge, user) {

    if (item) {
        return (
            <>
                {badge
                    && (
                        <div className="address-card__badge address-card__badge--muted">
                            {badge}
                        </div>
                    )}
                {item?.addressTitle && <div className="address-card__name">{`${item?.addressTitle}`}</div>}
                {item?.firstName && item?.lastName
                    && (
                        <div>
                            <div className="address-card__row-title">Alıcı: Ad-Soyad</div>
                            <div>
                                {item?.firstName}
                                {' '}
                                {item?.lastName}
                            </div>
                        </div>
                    )}
                {item.isCorporate === 1
                    && (
                        <div>
                            <div className="address-card__row-title">Şirket Bilgisi</div>
                            <div>
                                {item?.companyName}
                            </div>
                        </div>
                    )}
                <div className="address-card__row-title">Adres</div>
                <div className="address-card__row">
                    <div style={{ wordBreak: 'break-all' }}>
                        {item?.city}
                        {'/'}
                        {item?.district}
                        <br />
                        {item?.town}
                        <br />
                        {item?.addressText}
                    </div>
                </div>
                <div>
                    <div className="address-card__row-title">E-posta</div>
                    <div>{user?.email}</div>
                </div>
                <div>
                    <div className="address-card__row-title">Telefon</div>
                    <div className="address-card__row-content">
                        <NumberFormat
                            format="+## (###) ### ## ##"
                            value={item.phone}
                            displayType="text"
                        />
                    </div>
                </div>
            </>
        );
    }
    return <div>Lütfen Adres Bilgilerinizi Güncelleyiniz...</div>;
}
export default addressInfo