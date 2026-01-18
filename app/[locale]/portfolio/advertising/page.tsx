import CategoryPageBase from "@/components/CategoryPageBase";

export default async function AdvertisingPage({ params }: { params: { locale: string } }) {
    return <CategoryPageBase category="advertising" locale={params.locale} />;
}
