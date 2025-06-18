package z.practice.farm;

import java.util.Objects;

public class Farm {
    private String kind;

    public Farm() {
    }

    public Farm(String kind) {
        this.kind = kind;
    }

    @Override
    public String toString() {
        return kind;
    }

    @Override
    public int hashCode() {
        return Objects.hash(kind);
    }

    @Override
    public boolean equals(Object obj) {
        if (obj instanceof Farm) {
            Farm f = (Farm) obj;
            if (this.kind.equals(f.getKind())) {
                return true;
            }
        }
        return false;
    }

    public String getKind() {
        return kind;
    }

    public void setKind(String kind) {
        this.kind = kind;
    }
}
