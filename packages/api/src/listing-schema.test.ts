import { describe, expect, it } from "vitest";

import { createListingInput, LISTING_CATEGORIES } from "./listing-schema";

const base = {
    title: "Rumah Pantai",
    price: 250,
    location: "Lombok",
    whatsapp: "628123456789",
};

describe("kategori listing", () => {
    it("berisi tepat 4 kategori dengan tulisan persis", () => {
        expect([...LISTING_CATEGORIES]).toEqual([
            "Buy Property",
            "Buy land to build homestay",
            "Buy Airbnb Profile",
            "Buy Airbnb Business",
        ]);
    });

    it.each(LISTING_CATEGORIES)("menerima kategori %s", (category) => {
        expect(createListingInput.safeParse({ ...base, category }).success).toBe(
            true,
        );
    });

    it("menolak kategori yang tidak ada di daftar", () => {
        expect(
            createListingInput.safeParse({ ...base, category: "Buy Spaceship" })
                .success,
        ).toBe(false);
    });

    it("menolak kategori 'Buy Villa' dengan pesan error jelas", () => {
        const result = createListingInput.safeParse({
            ...base,
            category: "Buy Villa",
        });
        expect(result.success).toBe(false);
        if (!result.success) {
            const messages = result.error.issues.map((i) => i.message).join(", ");
            expect(messages).toContain("Invalid option");
        }
    });
});