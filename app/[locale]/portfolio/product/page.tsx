import CategoryPageBase from "@/components/CategoryPageBase";

export default async function ProductPage({ params }: { params: { locale: string } }) {
    return <CategoryPageBase category="product" locale={params.locale} />;
}
