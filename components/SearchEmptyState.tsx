import { useLanguage } from "@/contexts/LanguageContext";
import "./style/navigation.css";

export default function SearchEmptyState() {
    const { t } = useLanguage();

    return (
        <div id="emptySearch" className="d-flex flex-column align-items-center justify-content-center py-5" style={{ background: '#fff2ef' }}>
            <img
                src="https://res.cloudinary.com/dc62b2rfa/image/upload/v1734432425/wswsddwlftbryvksvifq.svg"
                alt="No results found"
                className="mb-4"
            />
            <h3 className="text-center mb-2"> {t('noEventsFound')}{ /*No events found!*/}</h3>
            <p className="text-muted">{t('searchAgain')}{ /*try searching with different word.*/} </p>
        </div>
    )
}

